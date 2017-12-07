/**
 * Created by chenxuhua on 2017/9/27.
 */
import {React} from "../../commonjs/CommonImport"
import demo from '../../images/demo.png';




class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextTypes={
        router: React.PropTypes.object
    }
    componentDidUpdate() {

    }

    componentDidMount() {
        mui.toast('测试mui兼容',{ duration:'long', type:'div' })
    }


    render() {
        return (
            <div className="mui">
                <header id="header" className="mui-bar mui-bar-nav">
                    <a className="mui-icon mui-icon-left-nav" onClick={() => this.context.router.goBack()}></a>
                    <h1 className="mui-title">产品详情</h1>
                </header>

                  <div  className="mui-content product-detail">
                    <div>
                        <div className="mui-card">
                            <div className="mui-card-content" >
                                <img  src={demo}  width="100%"/>
                            </div>
                        </div>
                        <div  className="title-content">
                            <h1  className="name">南非橙 500g</h1>
                            <div  className="detail">
                                南非脐橙皮薄汁多 鲜美水果 含各种微量元素 味甜 孕妇水果
                            </div>
                            <div  className="price">
                                <span  className="now">￥8.8</span>
                            </div>
                            <div  className="buy">
                                加入购物车
                            </div>
                        </div>

                        <div  className="introduce">
                            <h1  className="title">商品介绍</h1>
                            <div  className="desc">
                                西瓜，好西瓜，大西瓜，好吃的大西瓜
                            </div>
                        </div>
                        <div  className="cross-line"></div>
                        <div  className="ratings">
                            <h1  className="title">其他图片</h1>
                            <div  className="ratings-wrapper">

                                <div className="mui-card">
                                    <div className="mui-card-content" >
                                        <img src={demo} alt="" width="100%"/>
                                    </div>
                                    <div className="mui-card-footer">
                                      <p>图片1</p>
                                    </div>
                                </div>

                                <div className="mui-card">
                                    <div className="mui-card-content" >
                                        <img src={demo} alt="" width="100%"/>
                                    </div>
                                    <div className="mui-card-footer">
                                        <p>图片2</p>
                                    </div>
                                </div>


                                <div className="mui-card">
                                    <div className="mui-card-content" >
                                        <img src={demo} alt="" width="100%"/>
                                    </div>
                                    <div className="mui-card-footer">
                                        <p>图片3</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
export default ProductDetail


