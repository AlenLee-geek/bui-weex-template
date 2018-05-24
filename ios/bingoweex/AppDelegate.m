#import "AppDelegate.h"
#import <WeexSDK/WeexSDK.h>
#import "BGWeexLib/BGWeexLib.h"
#import <WXVideoComponent/WXVideoComponents.h>

@interface AppDelegate (){
    
}

@end

@implementation AppDelegate

//Info.plist中读取启动的js
#define START_PAGE [[NSBundle mainBundle] objectForInfoDictionaryKey:@"StartPage"]
#define BUNDLE_URL [NSString stringWithFormat:@"file://%@/bundlejs/%@",[NSBundle mainBundle].bundlePath,START_PAGE]

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    [self rootViewSetter];
    [self weexSetter];
    
    return YES;
}


#pragma mark rootViewSetter
#pragma 自定义BGBaseViewController 配合系统的UINavigationController
-(void)rootViewSetter{
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    self.window.backgroundColor = [UIColor whiteColor];
    NSString *url=[NSString stringWithFormat:@"%@",BUNDLE_URL];
    BGBaseViewController * vc=[[BGBaseViewController alloc] initWithSourceURL:[NSURL URLWithString:url] withParams:nil];
    BGRootViewController * root=[[BGRootViewController alloc] initWithRootViewController:vc];
    [root setNavigationBarHidden:YES];
    self.window.rootViewController=root;
    [self.window makeKeyAndVisible];
}

#pragma mark  weexSettter
- (void)weexSetter{
    
    [WXAppConfiguration setAppGroup:@"BingoWeex"];
    [WXAppConfiguration setAppName:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleName"]];
    [WXAppConfiguration setAppVersion:[[NSBundle mainBundle] objectForInfoDictionaryKey:@"CFBundleShortVersionString"]];
    
    //初始化SDK环境
    [WXSDKEngine initSDKEnvironment];

    //重写图片加载器、网络请求加载器、导航加载器
    [WXSDKEngine registerHandler:[BGImgLoaderDefaultImpl new] withProtocol:@protocol(WXImgLoaderProtocol)];
    [WXSDKEngine registerHandler:[BGWXNetworkImpl new] withProtocol:@protocol(WXResourceRequestHandler)];
    [WXSDKEngine registerHandler:[BGNavigationImpl new] withProtocol:@protocol(WXNavigationProtocol)];
    
    //初始化模块
    [WXSDKEngine registerModule:@"CameraModule" withClass:[CameraModule class]];
    [WXSDKEngine registerModule:@"ScannerModule" withClass:[ScannerModule class]];
    [WXSDKEngine registerModule:@"SQLiteModule" withClass:[SQLiteModule class]];
    [WXSDKEngine registerModule:@"FileModule" withClass:[FileModule class]];
    [WXSDKEngine registerModule:@"FileTransferModule" withClass:[FileTransferModule class]];
    [WXSDKEngine registerModule:@"AppModule" withClass:[AppModule class]];
    [WXSDKEngine registerComponent:@"video-ex" withClass:[BGVideoComponent class]];
    [WXSDKEngine registerComponent:@"videoex" withClass:[WXVideoComponents class]];

    //设置Log输出等级：调试环境默认为Debug，正式发布会自动关闭。
    [WXLog setLogLevel: WXLogLevelError];//输出日志
}

- (void)applicationWillResignActive:(UIApplication *)application {
    
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
   
}


- (void)applicationWillTerminate:(UIApplication *)application {
    
}


@end
