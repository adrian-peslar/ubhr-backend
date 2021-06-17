import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import AppData from 'UBHR/services/appData';
import Peer from 'simple-peer';
import { selectConversationByCaller } from 'UBHR/actions/chatActions';

const Conversation = (props) => {
    const [stream, setStream] = useState(null);
    const [makingCall, setMakingCall] = useState(false);
    const [makingCallToName, setMakingCallToName] = useState(false);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState('');
    const [callerSignal, setCallerSignal] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [callerName, setCallerName] = useState('');
    const [textValue, setTextValue] = useState('');

    const myVideo = useRef(null);
    const userVideo = useRef(null);
    const connectionRef = useRef(null);

    useEffect(() => {
        AppData.socket.on('callUser', (data) => {
            console.log('calluser..... ', data);
            setReceivingCall(true);
            setCaller(data.from);
            setCallerName(data.name);
            setCallerSignal(data.signal);
        });
        AppData.socket.on('rejected', (data) => {
            console.log('rejectingCall..... ', data);
            setMakingCall(false);
            setStream(null);
        });
        AppData.socket.on('endCall', (data) => {
            console.log('endingCall..... ', data);
            setMakingCall(false);
            setStream(null);
            leaveCall();
        });
        AppData.socket.on('callEndedBy', (data) => {
            console.log('callEndedBy..... ', data);
            setMakingCall(false);
            setReceivingCall(false);
            setStream(null);
            setCallAccepted(false);
            if (makingCall || receivingCall) {
                window.location.reload();
            }
        });
    }, []);

    const enableMyStream = () => {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    };

    const getInterlocutorsUserSocketIds = () => {
        const { chatUsers, selectedConversation, user: me } = props;
        let interlocutorsSocketIds = {
            mySocketId: null,
            otherSocketId: null,
        };

        chatUsers.forEach((user) => {
            if (selectedConversation !== null) {
                if (user.userId === selectedConversation.with.id) {
                    interlocutorsSocketIds.otherSocketId = user.socketId;
                }
            }

            if (user.userId === me.id) {
                interlocutorsSocketIds.mySocketId = user.socketId;
            }
        });
        return interlocutorsSocketIds;
    };
    const { mySocketId, otherSocketId } = getInterlocutorsUserSocketIds();

    const callUser = () => {
        const { selectedConversation, chatUsersOnlineMap, user } = props;
        if (chatUsersOnlineMap.includes(selectedConversation.with.id)) {
            enableMyStream().then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;

                console.log('stream', stream);
                const peer = new Peer({
                    initiator: true,
                    trickle: false,
                    stream: stream,
                });

                peer.on('signal', (data) => {
                    AppData.socket.emit('callUser', {
                        userToCall: otherSocketId,
                        signalData: data,
                        from: mySocketId,
                        name: user.name,
                    });
                });

                peer.on('stream', (stream) => {
                    userVideo.current.srcObject = stream;
                });
                AppData.socket.on('callAccepted', (signal) => {
                    setCallAccepted(true);
                    peer.signal(signal);
                });
                AppData.socket.on('callRejected', (signal) => {
                    console.log('c rejected');
                    // setCallAccepted(true);
                    // peer.signal(signal);
                });

                connectionRef.current = peer;

                setMakingCall(true);
                setMakingCallToName(selectedConversation.with.name);
            });
        }
    };

    const answerCall = () => {
        props.selectConversationByCaller(caller);
        enableMyStream().then((stream) => {
            setStream(stream);
            console.log('myVideo', myVideo);
            myVideo.current.srcObject = stream;

            setCallAccepted(true);
            const peer = new Peer({
                initiator: false,
                trickle: false,
                stream: stream,
            });
            peer.on('signal', (data) => {
                AppData.socket.emit('answerCall', { signal: data, to: caller });
            });
            peer.on('stream', (stream) => {
                userVideo.current.srcObject = stream;
            });

            peer.signal(callerSignal);
            connectionRef.current = peer;
        });
    };

    const rejectCall = () => {
        console.log('respingi un apel', receivingCall);
        if (receivingCall) {
            AppData.socket.emit('rejected', { to: caller });
        }
        setReceivingCall(false);
        setCaller('');
        setCallerName('');
        setCallerSignal(null);
    };

    const leaveCall = () => {
        if (makingCall) {
            AppData.socket.emit('endCall', { to: otherSocketId });
        }
        setCallEnded(true);
        setCaller('');
        setCallerName('');
        setCallerSignal(null);
        setMakingCall(false);
        setReceivingCall(false);
        setCallAccepted(false);
        connectionRef.current.destroy();
        window.location.reload();
    };

    const sendMessage = () => {
        //
        console.log('textValue', textValue);
        setTextValue('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const { selectedConversation, chatUsersOnlineMap } = props;
    return (
        <div className="conversationContainer">
            {receivingCall && !callAccepted ? (
                <div className="is-calling-bar">
                    <div className="caller">
                        <span>
                            <b>{callerName}</b> te sună...
                        </span>
                        <button type="button" className="btn btn-success pull-right" onClick={answerCall}>
                            Răspunde
                        </button>
                        <button type="button" className="btn btn-danger pull-right mr10" onClick={rejectCall}>
                            Respinge Apel
                        </button>
                        <div className="clearfix"></div>
                    </div>
                </div>
            ) : null}
            {makingCall && !callAccepted ? (
                <div className="is-calling-bar">
                    <div className="caller">
                        <span>Apelezi pe {makingCallToName} ...</span>
                        <button type="button" className="btn btn-danger pull-right" onClick={leaveCall}>
                            Întrerupe apelul
                        </button>
                        <div className="clearfix"></div>
                    </div>
                </div>
            ) : null}

            <div
                className="video-container"
                style={{ display: makingCall || callAccepted ? 'grid' : 'none' }}
            >
                <div className="video">
                    {stream && <video playsInline autoPlay muted ref={myVideo} style={{ width: '400px' }} />}
                </div>
                <div className="video">
                    {callAccepted && !callEnded ? (
                        <video playsInline ref={userVideo} autoPlay style={{ width: '400px' }} />
                    ) : null}
                </div>
            </div>

            {selectedConversation ? (
                <div>
                    <div className="conversation-header">
                        {selectedConversation.with.name}
                        {callAccepted && !callEnded ? (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-danger pull-right"
                                    onClick={leaveCall}
                                >
                                    Încheie Apelul
                                </button>
                                <div className="clearfix"></div>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-success pull-right"
                                    onClick={callUser}
                                    disabled={
                                        receivingCall ||
                                        makingCall ||
                                        (selectedConversation &&
                                            !chatUsersOnlineMap.includes(selectedConversation.with.id))
                                    }
                                >
                                    Apelează
                                </button>
                                <div className="clearfix"></div>
                            </>
                        )}
                    </div>
                    {makingCall || receivingCall ? (
                        ''
                    ) : (
                        <div>
                            <div style={{ height: '400px', flexWrap: 'wrap-reverse' }}></div>
                            <div style={{ borderTop: '1px solid #d0d7de', height: '40px', display: 'flex' }}>
                                <input
                                    value={textValue}
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) => setTextValue(e.target.value)}
                                    type="text"
                                    style={{ border: 0, width: '100%' }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-success pull-right"
                                    onClick={sendMessage}
                                >
                                    Trimite
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="please-select-conversation">💬 Alege o conversație din listă</div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggingIn: state.auth.loggingIn,
        isLoggedIn: state.auth.isLoggedIn,
        selectedConversation: state.chat.selectedConversation,
        chatUsers: state.chat.chatUsers,
        chatUsersOnlineMap: state.chat.chatUsersOnlineMap,
    };
};

const mapDispatchProps = (dispatch) => {
    return {
        selectConversationByCaller: (caller) => {
            dispatch(selectConversationByCaller({ caller }));
        },
    };
};

export default connect(mapStateToProps, mapDispatchProps)(Conversation);
