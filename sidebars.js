

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

    docs: [

        'Home',
        {
            type: 'category',
            label: '嵌入式-MCU',
            link: {
                type: 'generated-index',
            },
            items: [
                'kyuan_jianpan',
                'MCU_TEACH_TIMERGET',
                'MCU_IRN_YINGJIAN',
                'MCU_RT-THREAD-STAR',
                'MCU_RT-THREAD-SPI-CAN',
            ],
        },
        {
            type: 'category',
            label: '通讯协议',
            link: {
                type: 'generated-index',
            },
            items: [
                // 'USART',
                // 'IIC',
                'LIN',
                'CAN',
                'MODBUS',
                'TCP_IP',
                'MCU_USB',
                'GPS_NMEA0138',
            ],
        },
        {
            type: 'category',
            label: '工作软件',
            link: {
                type: 'generated-index',
            },
            items: [
                'canoe',
                'CAPL',
            ],
        },
        {
            type: 'category',
            label: '智能驾驶',
            link: {
                type: 'generated-index',
            },
            items: [
                'denji',
                'sport',
                'suanfafenlei',
                'yundong',
                'dingwei',
            ],
        },
        {
            type: 'category',
            label: '今日学习计划',
            link: {
                type: 'generated-index',
            },
            items: [
                'plan',
            ],
        },
        {
            type: 'category',
            label: 'Linux系统编程',
            link: {
                type: 'generated-index',
            },
            items: [
                'fork',
                'thread',
                'signal',
                'pipe',
            ],
        },
        // {
        //     type: 'category',
        //     label: '嵌入式-RTOS',
        //     link: {
        //         type: 'generated-index',
        //     },
        //     items: [
        //         'RTT_ROSMCU',
        //         'UART_USE',
        //         'ENV_USE',
        //     ],
        // },
        // {
        //     type: 'category',
        //     label: '嵌入式-Linux',
        //     link: {
        //         type: 'generated-index',
        //     },
        //     items: [
        //         'LINUX_UBUNTU',
        //         'LINUX_KNOLEW',
        //     ],
        // },
        // {
        //     type: 'category',
        //     label: '机器人_ROS',
        //     link: {
        //         type: 'generated-index',
        //     },
        //     items: [
        //         'ros_moveit',
        //         'ros_Slam',
        //         'ros_serial',
        //     ],
        // },
        {
            type: 'category',
            label: '机器人_算法',
            link: {
                type: 'generated-index',
            },
            items: [
                'kl',
                'bys',
                'EKF',
                'foc',
            ],
        },
        
    ],
};

module.exports = sidebars;
