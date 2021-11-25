import logo from './logo.svg';
import './App.css';
import Home from './home/Home';
import BlackList from './home/BlackList';
import LeftMenu from './home/LeftMenu';
import { Layout } from 'antd';
import { Switch, Route, Link} from 'react-router-dom'
import {CacheSwitch, CacheRoute} from 'react-cache-router';
import React from "react";


const { Header, Footer, Sider, Content } = Layout;


function App() {
    return (
        <div className="App">
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Sider><LeftMenu/></Sider>
                    <Content style={{marginLeft: 8, marginRight: 8}}>
                        <CacheSwitch>
                            <CacheRoute path="/home" component={Home}/>
                            <CacheRoute path="/blackList" component={BlackList}/>
                        </CacheSwitch>
                    </Content>
                </Layout>
                <Footer>

                </Footer>
            </Layout>
        </div>
    );
}
export default App;
