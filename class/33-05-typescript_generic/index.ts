// 1. 문자 타입
function getString(arg: string): string {
  return arg;
}
const result1 = getString("철수");

// 2. 숫자 타입
function getNumber(arg: number): number {
  return arg;
}
const result2 = getNumber(8);

// 3. any 타입
function getAny(arg: any): any {
  return arg;
}
const result31 = getAny("철수");
const result32 = getAny(8);
const result33 = getAny(true);

// 4. generic 타입
function getgeneric<MyType>(arg: MyType): MyType {
  return arg;
}
const result41 = getgeneric("철수");
const result42 = getgeneric(8);
const result43 = getgeneric(true);

// 5. any 타입 - 응용
function getAnyReverse(arg1: any, arg2: any, arg3: any): [any, any, any] {
  return [arg3, arg2, arg1];
}
const result5 = getAnyReverse("철수", "다람쥐초등학교", 8);

// 6. generic 타입 - 응용
// prettier-ignore
function getgenericReverse<MyType1,MyType2,MyType3>(arg1: MyType1, arg2: MyType2, arg3: MyType3): [MyType3, MyType2, MyType1] {
    return [arg3, arg2, arg1];
  }
const result6 = getgenericReverse("철수", "다람쥐초등학교", 8);

// 7. generic 타입 - 응용 - 축약버전1
// prettier-ignore
function getgenericReverseT<T1,T2,T3>(arg1: T1, arg2: T2, arg3: T3): [T3, T2, T1] {
    return [arg3, arg2, arg1];
  }
const result7 = getgenericReverseT("철수", "다람쥐초등학교", 8);

// 8. generic 타입 - 응용 - 축약버전2
// prettier-ignore
function getgenericReverseTUV<T,U,V>(arg1: T, arg2: U, arg3: V): [V, U, T] {
    return [arg3, arg2, arg1];
  }
const result8 = getgenericReverseTUV("철수", "다람쥐초등학교", 8);

// prettier-ignore
const result9 = getgenericReverseTUV<string, number , number>("철수", "다람쥐초등학교", 8);

//generic --> <> 이게 제네릭임
