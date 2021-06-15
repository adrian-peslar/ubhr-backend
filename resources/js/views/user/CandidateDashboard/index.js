import React, { Component } from 'react';
import Header from 'UBHR/components/Header';
import Footer from 'UBHR/components/Footer';
import Mesages from 'UBHR/components/Mesages';
import Calendar from 'react-calendar';

import { connect } from 'react-redux';

class HRDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSectionIndex: 3,
        };
    }

    onClickButton = (b) => {
        this.setState({ selectedSectionIndex: b });
    };

    renderSection = () => {
        switch (this.state.selectedSectionIndex) {
            case 0:
                return <div>Panou Candidat</div>;
            case 1:
                return <Calendar />;
            case 2:
                return <div>Contacte</div>;
            case 3:
                return <Mesages connections={this.props.connections} />;
        }
    };
    // check if user is authenticated and storing authentication data as states if true
    render() {
        return (
            <div className="hr-main-container">
                <div className="upper-row clearfix-container">
                    <div className="logo-container">UBHR</div>
                    <div className="header-container">
                        <Header />
                    </div>

                    <div className="clearfix"></div>
                </div>
                <div className="middle-row clearfix-container">
                    <div className="left-menu-container">
                        <div className="left-menu-button" onClick={() => this.onClickButton(0)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-border-all"
                                viewBox="0 0 16 16"
                            >
                                <path d="M0 0h16v16H0V0zm1 1v6.5h6.5V1H1zm7.5 0v6.5H15V1H8.5zM15 8.5H8.5V15H15V8.5zM7.5 15V8.5H1V15h6.5z" />
                            </svg>
                            <div className="noselect">Panou</div>
                        </div>
                        <div className="left-menu-button" onClick={() => this.onClickButton(1)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-calendar3"
                                viewBox="0 0 16 16"
                            >
                                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>
                            <div className="noselect">Calendar</div>
                        </div>
                        <div className="left-menu-button" onClick={() => this.onClickButton(2)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-people-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                <path
                                    fillRule="evenodd"
                                    d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
                                />
                                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
                            </svg>
                            <div className="noselect">Contacte</div>
                        </div>
                        <div className="left-menu-button" onClick={() => this.onClickButton(3)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="bi bi-chat-dots-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                            </svg>
                            <div className="noselect">Mesaje</div>
                        </div>
                    </div>
                    <div className="main-container">
                        {/* <h1>HR Dashboard</h1> */}
                        {this.renderSection()}
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className="bottom-row">
                    <div className="bottom-account-button-container">...</div>
                    <div className="bottom-footer-container">
                        <Footer />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        loggingIn: state.auth.loggingIn,
        isLoggedIn: state.auth.isLoggedIn,
    };
};

export default connect(mapStateToProps, null)(HRDashboard);
