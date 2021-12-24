import {Button, Col, Input, Row, Space} from 'antd';
import {get, post} from '../common/req'
import {useState, useEffect} from "react";

import moment from 'moment';
import BlackList from "./BlackList";
const { TextArea } = Input;


function GlobalSetting() {


    const onKV = (e, key) => {
        const text = e.target.value;
        return post('/api/setting/kv', {'key': key, 'value': text}).then((res) => {

        })
    };

    return (
        <div className="App">
            <Row type="flex" align="middle" style={{paddingBottom: "12px", paddingTop: "12px", paddingLeft: "24px"}}>
                <Col span={2} >
                    <p style={{fontSize: "20px"}}>myid: </p>
                </Col>
                <Col span={20}>
                    <TextArea placeholder="Autosize height based on content lines" autoSize onBlur={(e) => onKV(e, 'myid')}/>
                    <div style={{ margin: '24px 0' }} />
                </Col>
            </Row>
            <Row type="flex" align="middle" style={{paddingBottom: "12px", paddingTop: "12px", paddingLeft: "24px"}}>
                <Col span={2} >
                    <p style={{fontSize: "20px"}}>cookie: </p>
                </Col>
                <Col span={20}>
                    <TextArea placeholder="Autosize height based on content lines" autoSize onBlur={(e) => onKV(e, 'cookie')}/>
                    <div style={{ margin: '24px 0' }} />
                </Col>
            </Row>
        </div>
    );
}

export default GlobalSetting;
