export default function SidebarUser() {
  return (
    <div className="flex flex-col gap-12">
      <span className="text-head-20 mb-12 text-black">
        김코드님,
        <br />
        오늘도 목표를 달성해봐요!
      </span>
      <span className="text-text-03 text-body-m-16">test1@test.com</span>
      <button className="text-text-04 text-body-m-12 cursor-pointer">로그아웃</button>
    </div>
  );
}
