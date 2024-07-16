export default function Information() {
  return (
    <>
      <div className=" my-10 w-11/12">
        <div className="bg-white p-4 rounded flex justify-between items-center border-b">
          <h1 className="text-xl font-bold">Thông tin hữu ích</h1>
        </div>
        <div className="bg-white p-4 rounded-b-lg shadow-md">
          <div className="flex">
            <a
              href="https://www.kidsplaza.vn/blog/cac-loai-sua-bot-tot-nhat-cho-tre-so-sinh.html"
              className="w-1/3 p-4"
            >
              <img
                src="https://www.kidsplaza.vn/blog/wp-content/uploads/2018/12/sua-bot-tot-cho-tre-so-sinh-696x378.jpg"
                alt="Info 1"
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-2 font-bold">
                Top 7 loại sữa bột tốt nhất cho trẻ sơ sinh từ 0-6 tháng tuổi
              </p>
            </a>
            <div className="w-2/3 p-4">
              <div className="grid-cols-2 space-y-2">
                <a
                  href="https://www.kidsplaza.vn/blog/kidsplaza-mien-bac-super-party-cuoi-tuan-mung-sinh-nhat-16-tuoi.html"
                  className="flex"
                >
                  <img
                    src="https://www.kidsplaza.vn/blog/wp-content/uploads/2024/05/440150448_836471958513253_489599075180442466_n-696x697.jpg"
                    alt="Info 2"
                    className="w-1/6 h-auto rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-bold">BeBe SUPER PARTY cuối tuần</p>
                    <p className="text-gray-500">
                      Mừng sinh nhật Vàng - Nhận ngàn phần quà tại KidsPlaza với
                      chương trình Super Party. Chương trình...
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.kidsplaza.vn/blog/kidsplaza-mien-bac-super-party-cuoi-tuan-mung-sinh-nhat-16-tuoi.html"
                  className="flex"
                >
                  <img
                    src="https://www.kidsplaza.vn/blog/wp-content/uploads/2024/05/438302007_836471695179946_3176383851285113244_n-696x696.jpg"
                    alt="Info 3"
                    className="w-1/6 h-auto rounded-lg"
                  />
                  <div className="ml-4">
                    <p className="font-bold">BeBe SUPER PARTY cuối tuần</p>
                    <p className="text-gray-500">
                      Mừng sinh nhật Vàng - Nhận ngàn phần quà tại KidsPlaza với
                      chương trình Super Party. Chương trình...
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
