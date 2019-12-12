<template>
    <div class="home">
        <van-overlay :show="show">
            <!--    <img alt="Vue logo" src="../assets/logo.png">-->
            <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
            <div class="loading">
                <van-loading size="24px" vertical>加载中...</van-loading>
            </div>
        </van-overlay>
        <van-panel title="反馈类型">
            <div class="type">
                <van-row gutter="20">
                    <van-col span="8">
                        <van-button v-if="feedType!=='功能建议'" type="default" @click="feedType='功能建议'"> 功能建议</van-button>
                        <van-button v-if="feedType==='功能建议'" plain type="info"> 功能建议</van-button>
                    </van-col>
                    <van-col span="8">
                        <van-button v-if="feedType!=='使用疑问'" type="default" @click="feedType='使用疑问'"> 使用疑问</van-button>
                        <van-button v-if="feedType==='使用疑问'" plain type="info">使用疑问</van-button>
                    </van-col>
                    <van-col span="8">
                        <van-button v-if="feedType!=='异常问题'" type="default" @click="feedType='异常问题'"> 异常问题</van-button>
                        <van-button v-if="feedType==='异常问题'" plain type="info"> 异常问题</van-button>
                    </van-col>
                </van-row>
            </div>
        </van-panel>
        <van-panel title="反馈内容">
            <div class="content">
                <van-cell-group>
                    <van-field
                            v-model="problemDetails"
                            rows="3"
                            maxlength="250"
                            autosize
                            type="textarea"
                            placeholder="请输入需要反馈的问题详情"
                            :error-message="error1"
                            @input="changeError1"
                    />
                </van-cell-group>
                <van-uploader
                        v-model="imgFile"
                        :before-read="beforeRead"
                        :after-read="afterRead"
                        :max-size="2*1024*1024"
                        :max-count="5"
                >
                </van-uploader>
                <van-cell-group>
                    <van-field
                            v-model="contact"
                            label="联系方式"
                            maxlength="50"
                            placeholder="请填写联系方式(手机/邮箱等)"
                            :error-message="error2"
                            @input="changeError2"
                    />
                </van-cell-group>

            </div>
        </van-panel>
        <div class="postfrom">
            <van-button type="danger" size="large" @click="submit">提交</van-button>
        </div>

    </div>
</template>

<script>
    import 'vant/lib/toast/style'
    import Toast from 'vant/lib/toast'

    export default {
        name: 'home',
        data() {
            return {
                imgFile: [],
                feedType: "功能建议",
                problemDetails: null,
                contact: null,
                error1: "至少输入5个字符",
                error2: "不能为空",
                show: false,
            }
        },
        created() {

        },
        methods: {
            beforeRead(file) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    Toast('请上传 jpg 格式图片');
                    return false;
                }
                return true;
            },

            // 返回 Promise
            asyncBeforeRead(file) {
                return new Promise((resolve, reject) => {
                    if (file.type !== 'image/jpeg') {
                        Toast('请上传 jpg 格式图片');
                        reject();
                    } else {
                        resolve();
                    }
                });
            },
            afterRead(file) {
                const fromData = new FormData();
                let file2 = file.file;
                fromData.append('portrait_img', file2, file2.name);
                this.$imgUpload("user_upd_portrait", fromData).then((msg) => {
                    // this.addImg.url= msg.goods_img;
                    // this.imgFile.pop();
                    // this.imgFile.push(this.addImg)
                    let imgs = {url:null};
                    imgs.url=msg.goods_img;
                    this.imgFile[this.imgFile.length - 1] = imgs;
                })
            },
            changeError1(value) {
                if (value.length >= 5) {
                    this.error1 = null;
                } else {
                    this.error1 = "至少输入5个字符";
                }
            },
            changeError2(value) {
                let sReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                let tel = /^1[34578]\d{9}$/;
                if (value.length > 0) {
                    if (sReg.test(value) || tel.test(value)) {
                        this.error2 = null
                    } else {
                        this.error2 = "格式错误";
                    }
                } else {
                    this.error2 = "不能为空";
                }
            },
            submit() {
                if (this.error1 === null && this.error2 === null) {
                    this.show = true;
                    // let imgUrl= null;
                    // let it=null;
                    // for (let i=0;i<=this.imgFile.length;i++){
                    //     it=this.imgFile[i].toString();
                    //     console.log(it);
                    //     imgUrl=imgUrl+this.imgFile[i];
                    // }
                    // let imgUrl=this.imgFile[0].url;
                    // console.log(imgUrl);
                    let imgUrl='';
                    for (let i=0;i<this.imgFile.length;i++)
                    {
                        imgUrl=imgUrl+this.imgFile[i].url+",";
                    }
                    this.$post('add_feed_back',{
                        feed_back_type:this.feedType,
                        problem_details:this.problemDetails,
                        contact:this.contact,
                        img_files_url:imgUrl
                    }).then((msg) => {
                        if (msg) {
                            this.show = false;
                            Toast('提交成功')
                        }
                        else {
                            this.show = false;
                            Toast('提交失败');
                        }
                        }
                    ).catch(() => {
                        this.show = false;
                        Toast('提交失败');
                    })

                } else if (this.error1 != null) {
                    Toast("反馈内容" + this.error1)
                } else {
                    Toast("联系方式" + this.error2)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .home {
        .type {
            font-size: 12px;
            margin: 5%;
        }

        .loading {
            position: absolute;
            top: 30%;
            left: 45%;
        }

        .content {
            font-size: 12px;
        }

        .postfrom {
            width: 100%;
            position: absolute;
            bottom: 0;

        }
    }
</style>
