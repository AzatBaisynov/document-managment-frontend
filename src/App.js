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
import {Document} from "./components/documents/Document";
import {DocumentsMenu} from "./components/DocumentsMenu";
import { ApproveDoc } from "./components/approve/ApproveDoc";
import { CompleteDoc } from "./components/approve/CompletedDoc";


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
                                <Route exact path="/document" component={Document}/>
                                <Route exact path="/paymentrequests" component={PaymentRequests}/>
                                <Route exact path="/homepage" component={ContactsHomePage}/>
                                <Route exact path="/sraffyellowpage" component={ContactsStaffYellowPages}/>
                                <Route exact path="/addressbook" component={ContactsAddressBook}/>
                                <Route path="/document/:id" component={Document}/>
                                <Route path="/approval/:id" component={ApproveDoc} />
                                <Route path="/complete/:id" component={CompleteDoc} />
                            </Switch>

                        </Router>
                    </div> :
                    <Auth/>
            }
        </>
    );
}

export default App;
