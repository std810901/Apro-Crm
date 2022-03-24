<template>
  <div class="container">
    <div class="q-py-md topbar">
      <a href>
        <img src="https://img.onl/1pHK6b" alt />
      </a>
      <div class="item">
        <button>儲存</button>
        <button>瀏覽網站</button>
      </div>
    </div>
    <div class="bottom">
      <!-- 模塊類表 -->
      <div class="modules_overview">
        <div class="big_title">模組總覽</div>
        <div class="modules_list">
          <div class="modules_wrap" @click="openModule()">
            <div class="modules_name">
              <div class="title">頁首選單</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">形象Banner</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">關於我們</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">最新消息</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">產品介紹</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">影片播放</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">徵才專區</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">歷史沿革</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
          <div class="modules_wrap">
            <div class="modules_name">
              <div class="title">頁尾</div>
            </div>
            <ul>
              <li>
                <p>隱藏此區塊</p>
              </li>
              <li>
                <p>重新命名</p>
              </li>
              <li>
                <p>複製</p>
              </li>
              <li>
                <p>刪除</p>
              </li>
            </ul>
          </div>
        </div>
        <button class="add_modules">
          <p>增加模組</p>
        </button>
        <button class="tech_video">
          <p>模組設計影片教學</p>
        </button>
        <div class="time">
          <p>上午13:15</p>
        </div>
      </div>
      <!-- 模塊顯示 -->
      <div class="modules_container">
        <div class="modules">
          <div class="text">
            <div class="title">頁首選單</div>
            <!-- 點擊顯示類表功能與模塊顯示 -->
          </div>
          <div class="img_wrap">
            <div class="img_item">
              <!-- hover放大圖片 -->
              <img
                src="https://img.onl/LK3yRm"
                alt
                class="img"
                @mouseover="active()"
                @mouseleave="active()"
              />
            </div>
            <div class="img_item">
              <img src="https://img.onl/LK3yRm" alt class="img" />
            </div>
            <div class="img_item">
              <img src="https://img.onl/NgmSMc" alt class="img" />
            </div>
            <div class="img_item">
              <img src="https://img.onl/2S8J4L" alt class="img" />
            </div>
            <div class="img_item">
              <img src="https://img.onl/nEnUh7" alt class="img" />
            </div>
            <div class="img_item">
              <img src="https://img.onl/2S8J4L" alt class="img" />
            </div>
            <div class="img_item">
              <img src="https://img.onl/nEnUh7" alt class="img" />
            </div>
            <div class="img_item">
              <img src="https://img.onl/NgmSMc" alt class="img" />
            </div>
          </div>
        </div>
        <img src="https://img.onl/LK3yRm" alt class="big_img" />
      </div>
      <!-- 編輯畫面 -->
      <div class="modules_edit">
        <!-- 選擇編輯模塊 -->
        <div class="modules_wrap" @click="choose()">
          <img src="https://img.onl/C8XHuP" alt />
          <div class="frame"></div>
          <div class="edit_button">
            <p>編輯</p>
          </div>
          <div class="position">
          </div>
        </div>
        <div class="modules_wrap">
          <img src="https://img.onl/KrRPpU" alt />
          <div class="frame"></div>
          <div class="edit_button">
            <p>編輯</p>
          </div>
          <div class="position">
          </div>
        </div>
        <div class="modules_wrap">
          <img src="https://img.onl/q4CxrG" alt />
          <div class="block"></div>
          <div class="edit_button">
            <p>編輯</p>
          </div>
          <div class="position">
          </div>
        </div>
      </div>
      <!-- 步驟紐 -->
      <div class="modules_step">
        <div class="previous">
        </div>
        <div class="next active">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import modules from 'src/modules'
export default {
  data () {
    return {
      model: null,
      options: ['Home', 'About', 'News']
    }
  },
  methods: {
    // hover 放大圖片僅第一塊圖
    active () {
      const img = document.querySelector('.big_img')
      img.classList.toggle('active')
    },
    // 打開模塊功能與模塊顯示
    openModule () {
      const modules = document.querySelector('.modules_wrap')
      modules.classList.toggle('active')
      const module = document.querySelector('.modules_container')
      module.classList.toggle('active')
    },
    // 選擇編輯區塊
    choose () {
      const edit = document.querySelector('.modules_edit .modules_wrap')
      edit.classList.toggle('active')
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
}
.topbar {
  position: fixed;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 24px;
  border-bottom: 1px solid #b8b8b8;
  background: #ffffff;
  z-index: 1;
  .item {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    padding: 0 20px;
    button {
      width: 120px;
      padding: 9px 30px;
      background: #aa4dc8;
      color: #ffffff;
      font-size: 12px;
      border-radius: 15px;
      box-sizing: border-box;
      border: none;
      cursor: pointer;
      &:nth-child(1) {
        background: #000;
        margin-right: 12px;
      }
    }
  }
}

.bottom {
  display: flex;
  // 模塊類表
  .modules_overview {
    position: fixed;
    height: calc(100% - 47px);
    width: 225px;
    top: 47px;
    padding: 2.5vw 13px 0 23px;
    border-right: 1px solid #e7e7e7;
    .big_title {
      font-size: 18px;
      font-weight: bold;
      color: #000;
      letter-spacing: 0.45px;
      margin-bottom: 35px;
    }
    .modules_list {
      position: relative;
      overflow-y: auto;
      height: 387px;
      padding-right: 10px;
      /* width */
      &::-webkit-scrollbar {
        width: 3px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #aa4dc8;
        border-radius: 3px;
      }
      .modules_wrap {
        height: 43px;
        overflow: hidden;
        transition: 0.35s ease;
        &:last-child {
          .modules_name {
            border: none;
          }
        }
        &.active {
          transition: 0.35s ease;
          height: 250px;
          .modules_name {
            border-bottom: 1px solid #aa4dc8;
          }
          .more {
            transform: rotate(180deg);
          }
        }
        .modules_name {
          position: relative;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e7e7e7;
          margin-bottom: 10px;
          cursor: pointer;
          .title {
            position: absolute;
            left: 36px;
            font-size: 14px;
            font-weight: bold;
            color: #000;
          }
          .more {
            cursor: pointer;
          }
        }
        ul {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          li {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 37px;
            border-bottom: 1px solid #a5a5a5;
            margin-left: 36px;
            &:last-child {
              border: none;
            }
            p {
              position: relative;
              font-size: 14px;
            }
            .icon {
              cursor: pointer;
            }
          }
        }
      }
    }
    .add_modules {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #333333;
      border-radius: 17.5px;
      line-height: 36px;
      padding: 0px 14px 0px;
      border: none;
      outline: none;
      margin-top: 25px;
      cursor: pointer;
      p {
        font-size: 14px;
        color: #ffffff;
      }
      .icon {
        color: #aa4dc8;
        font-size: 14px;
      }
    }
    .tech_video {
      position: absolute;
      width: calc(100% - 46px);
      bottom: 6.0416vw;
      left: 0;
      line-height: 36px;
      padding: 0px 20px;
      margin: 0 23px;
      background: transparent;
      box-sizing: border-box;
      border: 1px solid #e7e7e7;
      border-radius: 17.5px;
      outline: none;
      cursor: pointer;
      p {
        font-size: 14px;
        font-weight: bold;
        color: #000;
      }
    }
    .time {
      position: absolute;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      bottom: 0;
      left: 0;
      padding: 17px 23px;
      border-top: 1px solid #e7e7e7;
      p {
        font-size: 14px;
        color: #000000;
        letter-spacing: 1.2px;
      }
      .icon {
        font-size: 24px;
      }
    }
  }
  // 模塊顯示
  .modules_container {
    position: fixed;
    width: 19.21875vw;
    height: calc(100% - 47px);
    left: 225px;
    top: 47px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 10;
    display: none;
    &.active {
      display: block;
    }
    .modules {
      width: 100%;
      height: 100%;
      padding-right: 20px;
      .text {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 2.34375vw 0px 3.0729vw 32px;
        .title {
          color: #fff;
        }
        .icon {
          font-size: 24px;
          color: #fff;
          position: absolute;
          right: 18px;
          cursor: pointer;
        }
      }
      .img_wrap {
        position: relative;
        width: 100%;
        height: calc(100% - 120px);
        overflow-y: auto;
        padding: 0 20px 0 32px;
        bottom: 30px;
        /* width */
        &::-webkit-scrollbar {
          width: 3px;
        }

        /* Track */
        &::-webkit-scrollbar-track {
          background: transparent;
        }
        /* Handle */
        &::-webkit-scrollbar-thumb {
          background: #aa4dc8;
          border-radius: 3px;
        }
        .img_item {
          margin-bottom: 17px;
          &:hover {
            border: 2px solid #aa4dc8;
          }
          &:last-child {
            margin-bottom: 0;
          }
          .img {
            width: 100%;
            height: auto;
            object-fit: cover;
            object-position: center;
            vertical-align: middle;
            cursor: move;
          }
        }
      }
    }
    .big_img {
      position: absolute;
      width: 100%;
      height: auto;
      object-fit: cover;
      object-position: center;
      transform: scale(1.2);
      right: -105%;
      z-index: 10;
      border: 1px solid #ffffff;
      top: 120px;
      display: none;
      &.active {
        display: block;
      }
    }
  }
  // 編輯畫面
  .modules_edit {
    position: relative;
    width: 51.614vw;
    height: calc(100vh - 47px);
    left: 35%;
    top: 75px;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    .modules_wrap {
      position: relative;
      cursor: move;
      &.active {
        .frame {
          display: block;
        }
        .edit_button {
          display: flex;
        }
        .position {
          display: flex;
        }
      }
      .frame {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 3px solid #aa4dc8;
        background: rgba(170, 77, 200, 0.3);
        left: 0;
        top: 0;
        display: none;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        vertical-align: middle;
      }
      .edit_button {
        position: absolute;
        width: 83px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 14px 10px;
        left: 21px;
        top: 23px;
        background: #ffffff;
        border-radius: 3px;
        display: none;
        cursor: pointer;
        .icon {
          font-size: 18px;
          margin-right: 10px;
        }
        p {
          font-size: 14px;
        }
      }
      .position {
        position: absolute;
        width: 83px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 10px;
        right: 21px;
        top: 23px;
        background: #ffffff;
        border-radius: 3px;
        cursor: pointer;
        display: none;
        &::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 100%;
          background: #eaeaea;
          left: 50%;
          transform: translateX(-50%);
        }
        .icon {
          font-size: 24px;
          color: #909090;
        }
      }
    }
  }
  // 步驟
  .modules_step {
    position: fixed;
    width: 53px;
    height: 106px;
    display: flex;
    flex-direction: column;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    .previous {
      width: 53px;
      height: 53px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .icon {
        color: #000;
        font-size: 24px;
      }
    }
    .next {
      width: 53px;
      height: 53px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &.active {
        background: #aa4dc8;
        .icon {
          color: #ffffff;
        }
      }
      .icon {
        color: #000;
        font-size: 24px;
      }
    }
  }
}
@media (max-width: 1500px) {
  .bottom {
    .modules_overview {
      .tech_video {
        bottom: 8.0416vw;
      }
    }
    .modules_edit {
      left: 40%;
    }
  }
}
@media (max-width: 1200px) {
  .bottom {
    .modules_overview {
    }
    .modules_edit {
      left: 42%;
    }
  }
}
</style>
