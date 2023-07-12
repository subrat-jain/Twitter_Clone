import { View, Button, Text, TouchableOpacity, TextInput } from 'react-native';
import React, { useRef, useState } from "react";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import twitterimg from "../../image/twitter.png";
import TwitterIcon from '@mui/icons-material/Twitter';
import { firebaseApp, auth } from '../../context/firebase';
// import firebase from 'firebase/compat/app';
import "./Login.css";

export default function SignupPhone() {

    const recaptchaVerifier = useRef(null)
    const [message, showMessage] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [verificationId, setVerificationId] = useState()
    const [verificationCode, setVerificationCode] = useState()

    const firebaseConfig = firebaseApp ? firebaseApp.options : undefined
    const attemptInvisibleVerification = true

    const navigate = useNavigate();

    return (
        <>
            <div className="login-container">
                <div className="image-container">
                    <img className=" image" src={twitterimg} alt="twitterImage" />
                </div>
                <div className="form-container">
                    <div className="form-box" >
                        <TwitterIcon style={{ color: "skyblue" }} />
                        <h2 className="heading">Login with Phone</h2>

                        <View>
                            <FirebaseRecaptchaVerifierModal
                                ref={recaptchaVerifier}
                                firebaseConfig={firebaseConfig}
                                attemptInvisibleVerification={attemptInvisibleVerification}
                            />
                            <h2>Enter Phone no.</h2>
                            <TextInput
                                style={{ 
                                    marginVertical: 10,
                                    fontSize: 17,
                                    backgroundColor: '#E8F0FE',
                                    padding: 10,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 8
                                }}
                                placeholder="ENTER PHONE NO."
                                autoFocus
                                autoCompleteType="tel"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                            />
                            <Button
                                title="SEND OTP"
                                disabled={!phoneNumber}
                                onPress={async () => {
                                    try {
                                        const phoneProvider = new PhoneAuthProvider(auth)
                                        const verificationId =
                                            await phoneProvider.verifyPhoneNumber(
                                                phoneNumber,
                                                recaptchaVerifier.current
                                            )
                                        setVerificationId(verificationId)
                                        showMessage({
                                            text: "Verification code has been sent to your phone.",
                                        })
                                    } catch (err) {
                                        showMessage({
                                            text: `Error 111: ${err.message}`,
                                            color: "red",
                                        })
                                    }
                                }}
                            />
                            <br />
                            <h2>Enter Verification code</h2>
                            <TextInput
                                style={{ 
                                    marginVertical: 10,
                                    fontSize: 17,
                                    backgroundColor: '#E8F0FE',
                                    padding: 10,
                                    borderColor: 'gray',
                                    borderWidth: 1,
                                    borderRadius: 8
                                }}
                                editable={!!verificationId}
                                placeholder="OTP"
                                onChangeText={setVerificationCode}
                            />
                            <Button
                                title="CONFIRM OTP"
                                disabled={!verificationId}
                                onPress={async () => {
                                    try {
                                        const credential = PhoneAuthProvider.credential(
                                            verificationId,
                                            verificationCode
                                        )

                                        await signInWithCredential(auth, credential)
                                        navigate("/");
                                    } catch (err) {
                                        showMessage({
                                            text: `Error: ${err.message}`,
                                            color: "red",
                                        })
                                    }
                                }}
                            />
                            {message ? (
                                <TouchableOpacity
                                    style={[
                                        StyleSheet.absoluteFill,
                                        {
                                            backgroundColor: 0xffffffee,
                                            justifyContent: "center",
                                        },
                                    ]}
                                    onPress={() => showMessage(undefined)}>
                                    <Text
                                        style={{
                                            color: message.color || "blue",
                                            fontSize: 17,
                                            textAlign: "center",
                                            margin: 20,
                                        }}>
                                        {message.text}
                                    </Text>
                                </TouchableOpacity>
                            ) : undefined}
                            {attemptInvisibleVerification }
                        </View>
                        <hr />
                    </div>
                    <br />
                    <div>
                        Go back.
                        <Link
                            to="/login"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            Login
                        </Link>
                        <span> /</span>
                        <Link
                            to="/signup"
                            style={{
                                textDecoration: 'none',
                                color: 'var(--twitter-color)',
                                fontWeight: '600',
                                marginLeft: '5px'
                            }}
                        >
                            SignUp
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
