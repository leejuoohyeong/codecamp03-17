interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// type Aaa={
//     name:string;
//     age: number;
//     school:string;
//     hobby?:string;
// }

// interface IProfile{
//     apple: number;

// }

// //선언병합
// const bbb: IProfile = {

// }

//
// 1. Partial 타입
type MyType1 = Partial<IProfile>;

// 2. Required 타입
type MyType2 = Required<IProfile>;

// 3. Pick 타입
type MyType3 = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type MyType4 = Omit<IProfile, "school">; // 빼고 싶은것

// 5. Record 타입
type ZZZ = "aaa" | "qqq" | "rrr"; // 유니온 타입
type MyType5 = Record<ZZZ, string>; // 각각에 레코드에 타입을 주기위함

const aaa: ZZZ;
aaa === "aaa";

// 만약, union 타입을 만들려면..?? => "name" | "age" | "school" | "hobby"
const qqq: keyof IProfile;
qqq === "name";
