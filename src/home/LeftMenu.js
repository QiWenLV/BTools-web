import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import {BrowserRouter,HashRouter,Route,Link, Routes } from 'react-router-dom'
import Home from './Home';
import BlackList from './BlackList';
import React from "react";

const { SubMenu } = Menu;

class LeftMenu extends React.Component {
    handleClick = e => {
        console.log('click ', e);
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}

                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="动态扫描">

                    <Menu.ItemGroup key="g1" title="主页">
                        <Menu.Item key="1"><Link to="/home">动态列表</Link></Menu.Item>
                        <Menu.Item key="2"><Link to="/blackList">黑名单</Link></Menu.Item>
                    </Menu.ItemGroup>
                    <Menu.ItemGroup key="g2" title="设置">
                        <Menu.Item key="3"><Link to="/globalSetting">全局设置</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/dynamicSetting">动态设置</Link></Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <SubMenu key="sub3" title="Submenu">
                        <Menu.Item key="7">Option 7</Menu.Item>
                        <Menu.Item key="8">Option 8</Menu.Item>
                    </SubMenu>
                </SubMenu>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}

export default LeftMenu;
