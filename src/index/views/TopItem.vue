<template>
    <article class="content-item">
        <el-row :gutter="30" class="row-list">
          <el-col :xs="24" :sm="8" :md="8" :lg="8" class='image'>
              <div class="grid-content bg-purple contentImg">
                  <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">
                      <img :src="item.sImg" :alt="item.title" />
                  </router-link>
              </div>
          </el-col>
          <el-col :xs="24" :sm="16" :md="16" :lg="16">
              <div class="discription">
                  <h2>
                      <router-link :to="'/details/'+item._id+'.html'" class="continue-reading">{{item.title}}</router-link>
                  </h2>
                  <div class="dis">{{item.discription | cutWords(90)}}</div>
                  <ul class="post-meta">
                      <li v-if="item.categories">
                          <div  v-if="item.categories.length>1">
                              <router-link :to="{path: '/'+(item.categories)[item.categories.length-1].defaultUrl+ '___'+(item.categories)[item.categories.length-1]._id}">{{(item.categories)[item.categories.length-1].name}}</router-link>
                          </div>
                          <div v-else-if="item.categories.length == 1">
                              <router-link :to="{path: '/'+(item.categories)[0].defaultUrl+ '___'+(item.categories)[0]._id}">{{(item.categories)[0].name}}</router-link>
                          </div>
                      </li>
                      <li>
                          <i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;{{item.date}}</li>
                      <li>
                          <i class="fa fa-eye" aria-hidden="true"></i>&nbsp;&nbsp;{{item.clickNum}}</li>
                      <li>
                          <i class="fa fa-comment" aria-hidden="true"></i>&nbsp;&nbsp;{{item.commentNum}}</li>
                  </ul>
              </div>
          </el-col>  
        </el-row>
    </article>
</template>
<style lang="scss">
.content-item {
  .row-list {
    // min-height: 142px;
  }
  .post-angle {
    position: absolute;
    left: -10px;
    height: 21px;
    color: #fff;
    text-align: center;
    background-color: #f63756;
    line-height: 24px;
    padding: 0 10px;
    z-index: 101;
    top: 0px;
    font-size: 13px;
  }
  .post-angle:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 21px;
    width: 0;
    height: 0;
    border-top: 6px solid #cd213d;
    border-left: 10px solid transparent;
  }
  .contentImg {
    width: 100%;
    overflow: hidden;
    -webkit-transition: -webkit-box-shadow 0.3s ease 0s;
    transition: -webkit-box-shadow 0.3s ease 0s;
    -o-transition: box-shadow 0.3s ease 0s;
    transition: box-shadow 0.3s ease 0s;
    transition: box-shadow 0.3s ease 0s, -webkit-box-shadow 0.3s ease 0s;
    img {
      width: 100%;
      min-height: 6rem;
      vertical-align: top;
      -webkit-transition: all 0.3s ease-out 0s;
      -o-transition: all 0.3s ease-out 0s;
      transition: all 0.3s ease-out 0s;
    }
    height: auto;
    display: block;
    position: relative;
    .content-cate {
      position: absolute;
      top: 0.4rem;
      left: 0.4rem;
      display: block;
      padding: 0 0.5rem;
      color: #fff;
      background: rgba(0, 0, 0, 0.5);
      font-size: 0.6rem;
      text-align: center;
      border-radius: 1rem;
      z-index: 11;
    }
  }
  .contentImg:hover {
    -webkit-box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.3);
    -webkit-transition: -webkit-box-shadow 0.3s ease 0s;
    transition: -webkit-box-shadow 0.3s ease 0s;
    -o-transition: box-shadow 0.3s ease 0s;
    transition: box-shadow 0.3s ease 0s;
    transition: box-shadow 0.3s ease 0s, -webkit-box-shadow 0.3s ease 0s;
  }
  .contentImg {
    img:hover {
      -webkit-transform: scale(1.03);
      -ms-transform: scale(1.03);
      transform: scale(1.03);
      -webkit-transition: all 0.3s ease-out 0s;
      -o-transition: all 0.3s ease-out 0s;
      transition: all 0.3s ease-out 0s;
    }
  }
  .discription {
    text-align: left;
    // min-height: 152px;
    h2 {
      margin: 0;
      font-size: 20px;
      word-break: break-all;
      font-weight: 400;
      line-height: 1.4;
    }

    .dis {
      margin: 10px 0;
      font-size: 13px;
      color: #666666;
    }

    .post-meta {
      a:link,
      a:visited {
        color: #3ca5f6;
      }
      position: absolute;
      bottom: 0;
      li {
        display: inline-block;
        font-size: 13px;
        color: #b4b4b4;
        margin: 0px 10px 0px 0;
      }
    }
  }
}
</style>

<script>
export default {
  name: "index-item",
  serverCacheKey: props => {
    return `article-item-${props.item._id}`;
  },
  props: ["item"]
};
</script>