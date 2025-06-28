import useBlockListStore from "../../../store/blockListStore";
import BannedUser from "../../../components/bannedUser/bannedUser";
const BanPage = () => {
  const blockerIdList = useBlockListStore((state) => state.blockerIdList);
  return (
    <div className="flex flex-col w-full gap-y-4">
      <p className="text-xl font-bold">Tài khoản bạn đã chặn</p>
      <p className="text-color-text-gray">
        Bạn có thể chặn mọi người từ trang cá nhân của họ
      </p>
      <div className="flex flex-col gap-y-4 h-[600px] overflow-y-auto custom-scrollbar pr-4">
        {blockerIdList.length > 0 ? (
          blockerIdList.map((item) => <BannedUser key={item.blockedUserId} bannedUserId={item.blockedUserId} />)
        ) : (
          <div className="h-full w-full text-center">
            <p className="text-color-text-gray">Bạn chưa chặn ai.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BanPage;
