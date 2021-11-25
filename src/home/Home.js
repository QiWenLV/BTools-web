import { Table, Tag, Space, Button, Row, Col, DatePicker, Form, Switch, Layout } from 'antd';
import {get, post} from '../common/req'
import {useState, useEffect} from "react";
import moment from 'moment';

const { Header, Footer, Sider, Content } = Layout;
function Home() {
    const [data, setData] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [scanTime, setScanTime] = useState(null);
    const [limitNum, setLimitNum] = useState(100);
    const [loadings, setLoadings] = useState([false]);
    const [enableBlacklist, setEnableBlacklist] = useState(true);
    const [blacklist, setBlacklist] = useState(true);

    useEffect(()=>{
        init()
    },[]);

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_INVERT,
            {
                key: 'select1',
                text: '排除黑名单',
                onSelect: changableRowKeys => {
                    let blackBVId = [];
                    blackBVId = data.filter((item, index) => {
                        return !(blacklist[item['mid']] === 0 || blacklist[item['mid']] === 1)
                    }).map(x => x["bvid"]);
                    setSelectedRowKeys(selectedRowKeys.filter(x => !blackBVId.includes(x)));
                },
            },
            {
                key: 'select2',
                text: '黑名单',
                onSelect: changableRowKeys => {
                    setSelectedRowKeys(data.filter((item, index) => !(blacklist[item['mid']] === 0 || blacklist[item['mid']] === 1)).map(x => x["bvid"]));
                },
            },
            {
                key: 'select3',
                text: '特别关心',
                onSelect: changableRowKeys => {
                    setSelectedRowKeys(data.filter((item, index) => blacklist[item['mid']] === 1).map(x => x["bvid"]));
                },
            },
        ],
    };

    const columns = [
        {
            title: 'bvid',
            dataIndex: 'bvid',
            key: 'bvid',
            render: text => <a>{text}</a>,
        },
        {
            title: 'up',
            dataIndex: 'up',
            key: 'up',
            sorter: {
                compare: (a, b) => a.up > b.up ? 1 : -1,
                multiple: 2,
                sortDirections: ['descend', 'ascend'],
                defaultSortOrder: 'ascend'
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '更新时间',
            dataIndex: 'time',
            key: 'time',
            sorter: {
                compare: (a, b) => a.time > b.time,
                multiple: 1,
                sortDirections: ['descend', 'ascend'],
                defaultSortOrder: 'descend'
            }
        },
        {
            title: '点赞',
            dataIndex: 'like',
            key: 'like',
        },
        {
            title: '硬币',
            dataIndex: 'coin',
            key: 'coin',
        },
        {
            title: '收藏',
            dataIndex: 'favorite',
            key: 'favorite',
        },
        {
            title: '播放',
            dataIndex: 'view',
            key: 'view',
        },
        {
            title: '视频数',
            dataIndex: 'videos',
            key: 'videos',
        },
    ];

    const init = () => {
        get('/api/home_param').then((res) => {
            setLimitNum(res.data.limit);
            setStartTime(res.data.scan_time * 1000);
            console.log(res.data.scan_time * 1000 + ' --- ' + res.data.limit)
        });

    };

    const dynamic_list = () => {
        //保存扫描时间
        setScanTime(Date.now());
        get('/api1/' + parseInt(startTime / 1000) + '/100').then((res) => {
            const rstData = res.data.list;
            get_black_list();
            const selectedRowKeys = [];
            console.log(blacklist)
            for (let i = 0; i < rstData.length; i++){
                rstData[i]['key'] = rstData[i]['bvid'];
                rstData[i]['time'] = moment(rstData[i]['time'] * 1000).format('YYYY-MM-DD HH:mm:ss')
                console.log(blacklist[rstData[i]['mid']]);
                if(blacklist[rstData[i]['mid']] === 0 || blacklist[rstData[i]['mid']] === 1){
                    selectedRowKeys.push(rstData[i]['bvid'])
                }
            }
            setSelectedRowKeys(selectedRowKeys)
            setData(rstData)
        })
    };

    function get_black_list() {
        get('/api/case/list').then((res) => {
            const newData = {};
            for (let i = 0; i < res.data.length; i ++){
                let item = res.data[i];
                newData[item["mid"]] = parseInt(item["type"]);
            }
            setBlacklist(newData);
        })
    }

    const open_action = () => {
        const param = '?scan_time=' + parseInt(scanTime / 1000) + '&limit=100';
        return post('/api/open'+param, selectedRowKeys).then((res) => {
            console.log('ok ' + startTime);
            setStartTime(scanTime);
        })
    };

    const onStartTimeChange = (date, dateString) => {
        setStartTime(Date.parse(dateString));
    };

    const handleEnableBlacklist = enable => {
        setEnableBlacklist(enable)
    };

    return (
        <div className="App">
            {/* eslint-disable-next-line no-undef */}
            <div>
                <Row type="flex" align="middle" style={{paddingBottom: "12px", paddingTop: "12px", paddingLeft: "24px"}}>
                    <Col span={5} >
                        <Space>
                            扫描截至时间:
                            <DatePicker showTime onChange={onStartTimeChange} value={moment(startTime)} format={'YYYY-MM-DD HH:mm:ss'}/>
                        </Space>
                    </Col>
                    <Col span={11} style={{verticalAlign: "middle"}}>
                        <Space>
                            当前扫描时间:
                            <DatePicker showTime defaultValue={moment(scanTime)} value={moment(scanTime)} disabled />
                            <div style={{align: "center"}}>
                                <Form.Item label="启用黑名单过滤" style={{marginBottom: "0"}}>
                                    <Switch checked={enableBlacklist} onChange={handleEnableBlacklist} />
                                </Form.Item>
                            </div>
                        </Space>
                    </Col>
                    <Col span={4} offset={4} push={0}>
                        <Space align="center">
                            <Button onClick={dynamic_list}>扫描</Button>
                            <Button type="primary" onClick={open_action}>打开</Button>
                        </Space>
                    </Col>
                </Row>
            </div>
            {/* eslint-disable-next-line no-undef */}
            <Table rowSelection={rowSelection} columns={columns} dataSource={data}/>
        </div>
    );

}

export default Home;
