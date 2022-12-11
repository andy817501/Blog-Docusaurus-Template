

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {

    docs: [

        'Home',

        {
            type: 'category',
            label: '高效工作指南',
            link: {
                type: 'generated-index',
            },
            items: [
                'MODELS3D_VIEW',
            ],
        },
        {
            type: 'category',
            label: '嵌入式-MCU',
            link: {
                type: 'generated-index',
            },
            items: [
                'MCU_TEACH_TIMERGET',
                 'MCU_IRN_YINGJIAN',
                // 'STM-STUDIO',
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
        // {
        //     type: 'category',
        //     label: '机器人_算法',
        //     link: {
        //         type: 'generated-index',
        //     },
        //     items: [
        //         'pid',
        //     ],
        // },
        
    ],
};

module.exports = sidebars;
