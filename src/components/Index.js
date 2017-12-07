/**
 * Created by chenxuhua on 2017/9/27.
 */
import {React,connect,action,requestApi,PageSomeThing,autobind,reactMixin} from "../commonjs/CommonImport"
import { PullToRefresh, ListView, Button,NavBar, WhiteSpace} from 'antd-mobile';

//页面特有区start
import scrolltop from 'scrolltop'
//页面特有区end


const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataArr = [];
    for (let i = 0; i < NUM_ROWS; i++) {
        dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    return dataArr;
}

@connect(
    state => ({
        commonState: state.commonState,
    }),
    action.commonState,
    (stateProps, dispatchProps, ownProps) => {
        return {
            ...stateProps,
            ...dispatchProps,
            ...ownProps,
        }
    },
    {
        pure: true,
        withRef: true,
    }
)
class Index extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            refreshing: true,
            isLoading: true,
        };
        this.isMount=true;
    }
    static contextTypes={
        router: React.PropTypes.object
    }
    componentWillMount(){

    }
    componentWillUnmount(){
        this.isMount=false;
    }
    componentDidMount() {
        if(this.props.commonState.productList && this.context.router.location.action==="POP"){
            this.rData =this.props.commonState.productList;
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                refreshing: false,
                isLoading: false,
            },function () {
                this.lv.scrollTo(0, this.props.commonState.scrollTop)
            });
        }
        else{
            setTimeout(() => {
                if(this.isMount){
                    this.rData = genData();
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(genData()),
                        refreshing: false,
                        isLoading: false,
                    });
                }
            }, 1500);
        }

    }

    onRefresh = () => {
        console.log("onRefresh");
        this.setState({ refreshing: true, isLoading: true });
        // simulate initial Ajax
        setTimeout(() => {
            if(this.isMount) {
                this.rData = genData();
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    refreshing: false,
                    isLoading: false,
                });
            }
        }, 600);
    };

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            if(this.isMount) {
                this.rData = [...this.rData, ...genData(++pageIndex)];
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this.rData),
                    isLoading: false,
                });
            }
        }, 1000);
    };

    handleGoDetail=(rowID)=>{
        this.props.productList(this.rData);
        this.props.scrollTop(scrolltop())
        this.context.router.push(`/productDetail/${rowID}`);
    }
    handleScroll=()=>{
         if(scrolltop()>200){
            this.backToUp.style.display="block";
         }
         else{
             this.backToUp.style.display="none";
         }
    }
    handleBackToUp=()=>{
        var that=this;
        var Tween = {
            Quart: {
                easeIn: function(t, b, c, d) {
                    return c * (t /= d) * t * t*t + b;
                },
                easeOut: function(t, b, c, d) {
                    return -c * ((t = t/d - 1) * t * t*t - 1) + b;
                },
                easeInOut: function(t, b, c, d) {
                    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                    return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
                }
            },
        }

        var elasticFall = function() {
            var oldScrollTop=scrolltop();
            var start = 0,
                beginingValue =0 ,
                changeValue =scrolltop(),
                during = 50;
            var _run= function() {
                start++;
                var top = Tween.Quart.easeOut(start, beginingValue, changeValue, during);
                that.lv.scrollTo(0, oldScrollTop-top);
                if(start < during) requestAnimationFrame(_run);
            }
            _run();
        };
        elasticFall();

    }
    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID}
                     style={{
                         padding: '0 15px',
                         backgroundColor: 'white',
                     }}
                >
                    <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
                        {obj.title}
                    </div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px' }}>
                        <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" onClick={()=>this.handleGoDetail(rowID)} />
                        <div style={{ display: 'inline-block' }}>
                            <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
                            <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
                        </div>
                    </div>
                </div>
            );
        };
        return (
            <div>
                <NavBar mode="light">商品列表</NavBar>
                <WhiteSpace size="md"/>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                        {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    useBodyScroll={true}
                    pullToRefresh={<PullToRefresh
                        refreshing={this.state.refreshing}
                        onRefresh={this.onRefresh}
                    />}
                    onScroll={this.handleScroll}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10000}
                     initialListSize={this.props.commonState.productList?this.props.commonState.productList.length:5}
                    pageSize={5}/>
                  <div className="back-to-up" style={{display:"none"}}   ref={el => this.backToUp = el} onClick={()=>this.handleBackToUp()}></div>
            </div>);
    }
}
export default Index


