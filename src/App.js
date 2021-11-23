import {Header} from "./components/Header";
import {useSelector} from "react-redux";
import {Auth} from "./components/Auth";
import MainPage from "./pages/MainPage";
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {ContactsPage} from "./pages/ContactsPage";
import {ContactsHomePage} from "./components/contacts-pages/ContactsHomePage";
import {ContactsStaffYellowPages} from "./components/contacts-pages/ContactsStaffYellowPages";
import {ContactsAddressBook} from "./components/contacts-pages/ContactsAddressBook";
import PaymentRequests from "./components/documents/PaymentRequests";
import { Dismissal } from "./components/documents/Dismissal";


const App = () => {
    const {isAuth} = useSelector(store => store.login)
    return (
        <>
            {
                isAuth ? <div className="App">
                        <Header/>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={MainPage}/>
                                <Route exact path="/contacts" component={ContactsPage}/>
                                <Route exact path="/dismissal" component={Dismissal}/>
                                <Route exact path="/paymentrequests" component={PaymentRequests}/>
                                <Route exact path="/homepage" component={ContactsHomePage}/>
                                <Route exact path="/sraffyellowpage" component={ContactsStaffYellowPages}/>
                                <Route exact path="/addressbook" component={ContactsAddressBook}/>
                            </Switch>

                        </Router>
                    </div> :
                    <Auth/>
            }

        </>
    );
}

export default App;
