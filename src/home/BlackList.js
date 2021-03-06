import { Table, Tag, Space, Button, Row, Col, Slider, Card, Avatar, Radio, Typography, Collapse  } from 'antd';
import { HeartOutlined, CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import {get, post} from '../common/req'
import {useState, useEffect} from "react";

function BlackList() {
    const {Text } = Typography;

    const { Meta } = Card;
    const { Panel } = Collapse;
    const [data, setData] = useState([]);

    const [colCountKey, setColCountKey] = useState(2);
    const [rows, setRows] = useState([]);

    useEffect(()=>{
        init()
    },[]);

    const init = () => {
        return get('/api/case/list').then((res) => {
            const data = res.data;
            let rows = [];
            let cols = [];
            for (let i=0; i < data.length; i++){
                // style={{backgroundColor:"rgba(255, 255, 255, 0.3)"}}
                cols.push(
                    <Col key={i.toString()} span={24 / 6} style={{color: "#F0F"}}>
                        <Card size="small" onClick={() => cardClick(i)} style={{padding: "8px"}} actions={[
                            <Radio.Group
                                defaultValue={data[i]['type']}
                                buttonStyle="solid" size="small">
                                <Radio.Button value="1"
                                              onClick={() => setChangeStar(data[i]['mid'], "1")}><HeartOutlined
                                    style={{marginLeft: 16, marginRight: 16}}/></Radio.Button>
                                <Radio.Button value="0"
                                              onClick={() => setChangeStar(data[i]['mid'], "0")}><CheckCircleOutlined
                                    style={{marginLeft: 16, marginRight: 16}}/></Radio.Button>
                                <Radio.Button value="2"
                                              onClick={() => setChangeStar(data[i]['mid'], "2")}><DeleteOutlined
                                    style={{marginLeft: 16, marginRight: 16}}/></Radio.Button>
                            </Radio.Group>
                        ]}>
                            <Meta
                                avatar={<Avatar src={data[i]['face']}/>}
                                title={<a href={"https://space.bilibili.com/" + data[i]['mid']}>{data[i]['uname']}</a>}
                                description={<Text ellipsis={true}
                                                   style={{fontSize: "12px", color: "gray"}}>{data[i]['desc']}</Text>}
                            />
                        </Card>
                    </Col>,
                );
                if(i % colCount === 0) {
                    rows.push(cols);
                    cols = []
                }
            }
            setRows(rows);
        });
    };

    const columns = [
        {
            title: 'up',
            dataIndex: 'uname',
            key: 'uname',
            render: text => <a>{text}</a>,
        },
        {
            title: 'mid',
            dataIndex: 'mid',
            key: 'mid',
            sorter: {
                compare: (a, b) => a.up > b.up ? 1 : -1,
                multiple: 2,
                sortDirections: ['descend', 'ascend'],
                defaultSortOrder: 'ascend'
            }
        },
        {
            title: 'face',
            dataIndex: 'face',
            key: 'face'
        },
        {
            title: 'desc',
            dataIndex: 'desc',
            key: 'desc'
        }
    ];

    const colCounts = {};

    [2, 3, 4, 6, 8, 12].forEach((value, i) => {
        colCounts[i] = value;
    });

    const colCount = colCounts[colCountKey];

    const onColCountChange = colCountKey => {
        setColCountKey(colCountKey);
    };

    const cardClick = i => {
        console.log(i)
    };


    const getCaseList = () => {
        return get('/api/case/list').then((res) => {
            setData(res.data)
        })
    };

    const setChangeStar = (mid, type) => {
        return post('/api/case/change', {"mid": mid, "type": type}).then((res) => {

        })
    };

    return (
        <div className="App">
            <Row type="flex" align="middle" style={{paddingBottom: "12px", paddingTop: "12px", paddingLeft: "24px"}}>
                <Col span={4} offset={20} align="center" style={{verticalAlign: "middle"}}>
                    <Space>
                        <Button onClick={getCaseList}>??????</Button>
                        <Button type="primary" onClick={getCaseList}>??????</Button>
                    </Space>
                </Col>
            </Row>
            <Row gutter={[8, 8]}>
                {/*<Collapse defaultActiveKey={['1']} onChange={callback}>*/}
                {/*    <Panel header="This is panel header 1" key="1">*/}
                {/*        <p>{text}</p>*/}
                {/*    </Panel>*/}
                {/*    <Panel header="This is panel header 2" key="2">*/}
                {/*        <p>{text}</p>*/}
                {/*    </Panel>*/}
                {/*    <Panel header="This is panel header 3" key="3">*/}
                {/*        <p>{text}</p>*/}
                {/*    </Panel>*/}
                {/*</Collapse>*/}
                {rows}
            </Row>
        </div>
    );
}

export default BlackList;
