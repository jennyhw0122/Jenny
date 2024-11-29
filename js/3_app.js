
/** 일반적인 모듈 가져오기 */
import { add, subtract} from './4_math';
import mulitply from './4_math';

console.log(add(5,3));
console.log(subtract(10,4));
console.log(mulitply(2,4));

//모듈 전체 가져오기
import * as Math from'./4_math'; //* <- ALL
//몽땅 가져와서 Math라는 객체라고 쓸께
console.log(Math.add(2,3));

//이름 변경하여 가져오기
import { add as sum } from './4_math';
//상황1 원본은 유지 되는데, 데려와서 이름을 변경해서 쓰는 경우
//원본 가서 이름을 바꾸면? 그 원본을 가져다 쓰는 다른 파일이 영향을 받음
/**문제가 커지므로 원본은 보존, 데려와서 {원본명 as 새로운 이름} 라는 형식
 */
console.log(sum(2,3));

/** 
 * fetxh
 * axios
 * 비동기/동기
 * 
 */
