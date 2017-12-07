/**
 * Created by chenxuhua on 2017/11/24.
 */
import {React} from "../../commonjs/CommonImport"
import ProductDetail from '../../components/basic/ProductDetail'
export default class ProductDetailContainer extends React.Component {
    render() {
            return (<ProductDetail routes={this.props.routes} router={this.props.router} children={this.props.children}></ProductDetail>)
    }
}
