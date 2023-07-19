---
id:  thread
title: Linux编程--线程篇
---

## 线程概述
因为本人是先接触的mcu在接触的SOC对于，线程远比进程熟悉，就不过多赘述了，在Linux系统中为了减少cpu在进程切换时的额外开销，因此Linux进程演化出了另一个概念——线程。

线程的本质是一个进程内部的一个控制序列，它是进程里面的东西，一个进程可以拥有一个进程或者多个进程。


## Linux系统下线程编程

### 线程创建
在Linux系统下的多线程遵循POSIX标准，而其中的一套常用的线程库是 pthread，除此之外在链接时需要使用库libpthread.a。因为pthread的库不是Linux系统的库， 所以在编译时要加上-lpthread 选项。

其中线程创建的函数就是pthread_create();
```C title="pthread_create()函数原型"
#include <pthread.h>
int pthread_create(pthread_t *thread,  //指向线程标识符的指针。
                   const pthread_attr_t *attr,//attr：设置线程属性，
                   void *(*start_routine) (void *), //线程入口的函数指针
                   void *arg);  //运行线程时传入的参数。
```
对于线程属性是一个结构体，其中包含了线程的各种参数
```C title="pthread_attr_t结构体"
typedef struct
{
    int                   etachstate;      //线程的分离状态
    int                   schedpolicy;     //线程调度策略
    structsched_param     schedparam;      //线程的调度参数
    int                   inheritsched;    //线程的继承性
    int                   scope;           //线程的作用域
    size_t                guardsize;       //线程栈末尾的警戒缓冲区大小
    int                   stackaddr_set;   //线程的栈设置
    void*                 stackaddr;       //线程栈的位置
    size_t                stacksize;       //线程栈的大小
}pthread_attr_t;
```
### 线程属性
线程的属性非常多，而且其属性值不能直接设置，须使用相关函数进行操作，线程属性主要包括如下属性： 作用域（scope）、栈大小（stacksize）、栈地址（stackaddress）、优先级（priority）、 分离的状态（detachedstate）、调度策略和参数（scheduling policy and parameters）。 默认的属性为非绑定、非分离、1M的堆栈大小、与父进程同样级别的优先级。

一般情况下使用默认属性就可以

而使用pthread_attr_init()函数可以初始化线程对象的属性，函数原型如下：

```C title="pthread_attr_init()函数原型"
int pthread_attr_init(pthread_attr_t *attr);
//attr：指向一个线程属性的指针
//返回值：若函数调用成功返回0，否则返回对应的错误代码。
```

而使用pthread_attr_destroy()可以销毁一个线程的属性对象

```C title="而使用pthread_attr_destroy()函数原型"
int pthread_attr_destroy(pthread_attr_t *attr);
//attr：指向一个线程属性的指针
//返回值：若函数调用成功返回0，否则返回对应的错误代码。
```
### 线程的分离状态
线程属性值中有一个分离状态，什么是线程的分离状态呢？在任何一个时间点上，线程是可结合的（joinable）， 或者是分离的（detached）。一个可结合的线程能够被其他线程收回其资源和杀死；在被其他线程回收之前， 它的存储器资源（如栈）是不释放的。相反，一个分离的线程是不能被其他线程回收或杀死的， 它的存储器资源在它终止时由系统自动释放。

总而言之：线程的分离状态决定一个线程以什么样的方式来终止自己。

进程中的线程可以调用pthread_join()函数来等待某个线程的终止，获得该线程的终止状态，并收回所占的资源， 如果对线程的返回状态不感兴趣，可以将rval_ptr设置为NULL。

```C title="而使用pthread_join()函数原型"
int pthread_join(pthread_t tid, void **rval_ptr)；
```

除此之外线程也可以调用pthread_detach()函数将此线程设置为分离状态，设置为分离状态的线程在线程结束时， 操作系统会自动收回它所占的资源。设置为分离状态的线程，不能再调用pthread_join()等待其结束。
```C title="而使用pthread_detach()函数原型"
int pthread_detach(pthread_t tid)；
```
如果一个线程是可结合的，意味着这条线程在退出时不会自动释放自身资源，而会成为僵尸线程， 同时意味着该线程的退出值可以被其他线程获取。因此，如果不需要某条线程的退出值的话， 那么最好将线程设置为分离状态，以保证该线程不会成为僵尸线程。


###  线程的调度策略
线程属性里包含了调度策略配置，POSIX 标准指定了三种调度策略：

分时调度策略，SCHED_OTHER。这是线程属性的默认值，另外两种调度方式只能用于以超级用户权限运行的进程， 因为它们都具备实时调度的功能，但在行为上略有区别。

实时调度策略，先进先出方式调度(SCHED_FIFO)。基于队列的调度程序，对于每个优先级都会使用不同的队列， 先进入队列的线程能优先得到运行，线程会一直占用CPU，直到有更高优先级任务到达或自己主动放弃CPU使用权。

实时调度策略 ，时间片轮转方式调度(SCHED_RR)。与 FIFO相似，不同的是前者的每个线程都有一个执行时间配额， 当采用SHCED_RR策略的线程的时间片用完，系统将重新分配时间片， 并将该线程置于就绪队列尾，并且切换线程，放在队列尾保证了所有具有相同优先级的RR线程的调度公平。

与调度相关的API接口如下：
```C title="与调度相关的API接口"
int pthread_attr_setinheritsched(pthread_attr_t *attr, int inheritsched);
int pthread_attr_getinheritsched(const pthread_attr_t *attr, int *inheritsched);
int pthread_attr_setschedpolicy(pthread_attr_t *attr, int policy);
int pthread_attr_getschedpolicy(const pthread_attr_t *attr, int *policy);
/*attr：指向一个线程属性的指针。

inheritsched：线程是否继承调度属性，可选值分别为

PTHREAD_INHERIT_SCHED：调度属性将继承于创建的线程，attr中设置的调度属性将被忽略。

PTHREAD_EXPLICIT_SCHED：调度属性将被设置为attr中指定的属性值。

policy：可选值为线程的三种调度策略，SCHED_OTHER、SCHED_FIFO、SCHED_RR。
*/
```
### 线程的优先级
在Linux系统中，优先级数值越小， 线程优先级越高,获取、设置线程静态优先级（staticpriority）可以使用以下函数，注意，是静态优先级， 当线程的调度策略为SCHED_OTHER时，其静态优先级必须设置为0。线程的静态优先级之所以被称为“静态”，是因为只要你不强行使用相关函数修改它， 它是不会随着线程的执行而发生改变.
```C title="设置静态优先级函数"
int pthread_attr_setschedparam(pthread_attr_t *attr, const struct sched_param *param);
int pthread_attr_getschedparam(const pthread_attr_t *attr, struct sched_param *param);
```

线程优先级有以下特点：

新线程的优先级为默认为0。

新线程不继承父线程调度优先级(PTHREAD_EXPLICIT_SCHED)

当线程的调度策略为SCHED_OTHER时，不允许修改线程优先级，仅当调度策略为实时（即SCHED_RR或SCHED_FIFO）时才有效， 并可以在运行时通过pthread_setschedparam()函数来改变，默认为0。


### 线程栈
线程栈是非常重要的资源，它可以存放函数形参、局部变量、线程切换现场寄存器等数据， 在前文我们也说过了，线程使用的是进程的内存空间，那么一个进程有n个线程，默认的线程栈大小是1M，设置、获取线程栈大小可以使用以下函数：
```C title="设置静线程栈大小函数"
int pthread_attr_setstacksize(pthread_attr_t *attr, size_t stacksize);
int pthread_attr_getstacksize(const pthread_attr_t *attr, size_t *stacksize);
```