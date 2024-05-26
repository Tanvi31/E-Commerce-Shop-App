function Footer() {
  return (
    <footer className="pt-3">
      <hr className="w-11/12 my-4 h-0.5 m-auto bg-black" />
      <div className="flex py-4">
        <div className="basis-2/5"></div>
        <div className="basis-1/2 flex justify-around">
          {Array(3)
            .fill()
            .map((_, e) => {
              return (
                <div key={e}>
                  <h5 className="font-bold pb-3">Lorem Ipsum</h5>
                  <ul className="px-3">
                    <li className="text-sm text-gray-500">Lorem</li>
                    <li className="text-sm text-gray-500">Lorem</li>
                    <li className="text-sm text-gray-500">Lorem</li>
                    <li className="text-sm text-gray-500">Lorem</li>
                    <li className="text-sm text-gray-500">Lorem</li>
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
      <div className="py-8"></div>
      <div className="py-2 mt-0.5 bg-black text-white uppercase text-center">
        copyrights sight.com all rights reserved
      </div>
    </footer>
  );
}

export default Footer;
