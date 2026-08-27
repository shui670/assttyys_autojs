import {
	IFuncOrigin,
	IFuncOperatorOrigin,
	IFuncOperator,
} from '@/interface/IFunc';
import { Script } from '@/system/script';

// const normal = -1; //定义常量
const left = 0;
const center = 1;
const right = 2;

export class Func604 implements IFuncOrigin {
	id = 604;
	name = '首领退治';
	operator: IFuncOperatorOrigin[] = [{ // 0 检测_是否为首领退治集结页
		desc: [1280, 720,
			[
				[left, 108, 26, 0xd7c5a2],
				[left, 47, 28, 0xd7c5a2],
				[right, 1007, 612, 0xefeeef],
				[right, 855, 599, 0x443f58],
				[right, 751, 615, 0xd34e57],
				[right, 1190, 574, 0xd5ba9d],
				[right, 1196, 662, 0xeecf93],
			],
		],
		oper: [
			[right, 1280, 720, 1157, 577, 1232, 646, 1200], // 点击挑战
		],
	}, { // 1 寮信息界面返回
		desc: '寮信息界面',
		oper: [
			[left, 1280, 720, 25, 10, 75, 54, 1000],     //  寮活动 返回区域
		]
	},];
	operatorFunc(thisScript: Script, thisOperator: IFuncOperator[]): boolean {
		if (thisScript.oper({
			name: '检测_首领退治',
			operator: [thisOperator[0]]
		})) {
			return true;
		}
		if (thisScript.oper({
			name: '检测_阴阳寮页',
			operator: [thisOperator[1]]
		})) {
			const next_scheme = '返回庭院';
			thisScript.rerun(next_scheme);
			sleep(1000);
			return true;
		}
		return false;
	}
}
