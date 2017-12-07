import {React} from "../commonjs/CommonImport"
import { List, InputItem, WhiteSpace,NavBar,Icon,Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import requestApi from '../commonjs/requestApi';
import md5 from 'js-md5';



class BasicInputExample extends React.Component {
    componentDidMount() {
        this.autoFocusInst.focus();
    }
    static contextTypes={
        router: React.PropTypes.object
    }
    handleSubmit=()=>{
        var userName=this.props.form.getFieldProps('userName').value||"";
        var password=this.props.form.getFieldProps('password').value||"";
        var verifyCode=this.props.form.getFieldProps('verifyCode').value||"";

        console.log("userName=",userName);
        console.log("password=",password);
        console.log("verifyCode=",verifyCode);

        if(userName.trim()===""){
            Toast.fail("请输入用户名",3,null,false);
        }
        else if(password.trim()===""){
            Toast.fail("请输入密码",3,null,false);
        }
        else if(verifyCode.trim()===""){
            Toast.fail("请输入验证码",3,null,false);
        }
        else{
            var that=this;
            var load = new requestApi.login.login_userLogin();
            load.param ={
                userName:userName,
                password:md5(password),
                verifyCode:verifyCode,
            };
            load.exec(function( data ){
                if(data.success){
                    localStorage.setItem('fullName', "张三");//测试环境
                    localStorage.setItem('token', "测试token");
                    that.context.router.push(`/index`);
                }
                else{
                    that.props.form.resetFields();
                    that.hanlderChangeCode();
                    Toast.fail(data.errorMsg);
                }
            },function (error) {
                that.hanlderChangeCode();
            });
        }
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <div>
                <NavBar mode="light">登录</NavBar>
                <WhiteSpace size="lg"/>
                <List>
                    <InputItem
                        {...getFieldProps('userName')}
                        clear
                        placeholder="请输入用户名"
                        ref={el => this.autoFocusInst = el}>
                        用户名
                    </InputItem>

                    <InputItem
                        {...getFieldProps('password')}
                        clear
                        placeholder="请输入密码">
                        密码
                    </InputItem>

                    <InputItem
                        {...getFieldProps('verifyCode')}
                        clear
                        placeholder="请输入验证码">
                        验证码
                    </InputItem>

                    <List.Item>
                        <div
                            style={{ width: '100%', color: '#108ee9', textAlign: 'center' }}>
                            <Button type="primary" inline size="small"  onClick={(e)=>{this.handleSubmit(e)}} style={{ marginRight: '4px' }}>登录</Button>
                        </div>
                    </List.Item>
                </List>
            </div>
        );
    }
}

const BasicInputExampleWrapper = createForm()(BasicInputExample);
export default BasicInputExampleWrapper;