<template>
    <div id="app">
        <transition :name="transitionName">
            <keep-alive v-if="$route.meta.keepAlive">
                <router-view class="router"></router-view>
            </keep-alive>
            <router-view class="router" v-if="!$route.meta.keepAlive"></router-view>
        </transition>


        <mt-tabbar>
            <mt-tab-item id="tab2">
                <router-link to="/about">About {{transitionName}} {{!$route.meta.keepAlive}}</router-link>
            </mt-tab-item>
            <mt-tab-item id="tab3">
                <router-link to="/login">login</router-link>
            </mt-tab-item>
            <mt-tab-item id="tab4">
                <router-link to="/register">register</router-link>
            </mt-tab-item>
        </mt-tabbar>
    </div>
</template>

<script>
    import defaultSetting from './settings'

    export default {
        name: 'app',
        computed: {
            transitionName() {
                if (defaultSetting.needPageTrans) {
                    return this.$store.state.direction
                }
                return ''
            }
        }
    }
</script>

<style lang="scss">
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100%;
        height: 100%;
        position: relative;
        text-align: center;
    }

    .router {
        width: 100%;
        height: 100%;
        position: absolute;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: #fff;
    }

    /* page change */
    $--transition-time: 300ms;
    .back-enter-active,
    .back-leave-active,
    .forward-enter-active,
    .forward-leave-active {
        will-change: transform;
        transition: transform $--transition-time;
        position: absolute;
        height: 100%;
        backface-visibility: hidden;
        perspective: 1000;
    }
    .back-enter {
        opacity: 0.75;
        transform: translate3d(-50%, 0, 0) !important;
    }
    .back-enter-active {
        z-index: -1 !important;
        transition: transform $--transition-time;
    }
    .back-leave-active {
        transform: translate3d(100%, 0, 0) !important;
        transition: transform $--transition-time;
    }
    .forward-enter {
        transform: translate3d(100%, 0, 0) !important;
    }
    .forward-enter-active {
        transition: transform $--transition-time;
    }
    .forward-leave-active {
        z-index: -1;
        opacity: 0.65;
        transform: translate3d(-50%, 0, 0) !important;
        transition: transform $--transition-time;
    }

</style>
