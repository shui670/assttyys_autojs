import { effect$ } from '@auto.pro/core';
import myFloaty from '@/system/MyFloaty';
import webviewEvents from '@/system/webviewEvents';
import InputHideUtil from '@/system/inputhideutil';
import { storeCommon } from '@/system/Store/store';
import drawFloaty from '@/system/drawFloaty';
import { doInitHookConsoleLog, requestMyScreenCapture, setWebLoaded } from './common/toolAuto';
import helperBridge from '@/system/helperBridge';
import MyAutomator from '@/system/MyAutomator';

webviewEvents();

const storeSettings = storeCommon.get('settings', {});
if (!storeSettings.tapType) {
	if (device.sdkInt >= 24) {
		storeSettings.tapType = '无障碍';
	} else {
		storeSettings.tapType = 'Root';
	}
	storeCommon.put('settings', storeSettings);
}
helperBridge.setAutomator(new MyAutomator(storeSettings.tapType));
requestMyScreenCapture((success: boolean) => {
	if (success) {
		setWebLoaded(true);
	}
}, helperBridge);

// effect$是作业线程，当core的权限全部到位后，effect$才开始运作
effect$.subscribe(() => {
	// 监听放在effect里，只有当权限到位后，监听才生效
	if (floaty.checkPermission()) {
		myFloaty.init();
	}
	const storeSettings = storeCommon.get('settings', {});
	if (storeSettings?.floaty_debugger_draw) {
		drawFloaty.init();
	}
	if (storeSettings?.remote_log_url) {
		doInitHookConsoleLog(storeSettings.remote_log_url);
	}
	InputHideUtil.assistActivity(activity);
});
