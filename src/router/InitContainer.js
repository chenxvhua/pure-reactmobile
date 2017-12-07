/**
 * Created by chenxuhua on 2017/9/6.
 */
import React from 'react';
//kenley 组件加载区start
import Login from '../components/Login';
import Index from '../components/Index';
import ProductDetail from '../components/basic/ProductDetail';
//kenley 组件加载区end



const containerGenerator = function( ContentComponent ){
    class Container extends React.Component {
        render() {
            return (<ContentComponent routes={this.props.routes} router={this.props.router} children={this.props.children}></ContentComponent>)
        }
    }
    return Container
}



export  const LoginContainer=containerGenerator(Login);
export  const IndexContainer=containerGenerator(Index);
export  const ProductDetailContainer=containerGenerator( ProductDetail);







