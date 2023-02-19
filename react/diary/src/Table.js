export const Table = () => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Activities</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <tbody className="text-sm divide-y divide-gray-100">
              <tr>
                <td className="p-2 whitespace-nowrap">
                  <span className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max">
                    1
                  </span>
                </td>
                <td className="p-2">
                  <div className="line-clamp-3 text-left">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Curabitur tincidunt faucibus mauris id ullamcorper. Etiam
                    accumsan ante porta metus vulputate mollis. Suspendisse
                    mattis pharetra gravida. Mauris blandit, elit quis laoreet
                    iaculis, ipsum massa efficitur sem, vel vehicula tortor
                    mauris sed quam. Vestibulum lacus eros, commodo eget turpis
                    dictum, consequat pretium leo. Sed ut molestie tortor, a
                    interdum urna. Nunc eu vulputate urna. Nullam diam mauris,
                    rhoncus luctus risus sed, ultrices interdum nunc. Phasellus
                    hendrerit pretium mauris ac feugiat. Aenean ex dolor, ornare
                    eget pretium in, blandit non odio. Maecenas et dui at nunc
                    tristique lobortis in non tellus. Duis non risus vel nisl
                    iaculis volutpat. Donec at leo quis urna tincidunt laoreet
                    vel eu diam. Nam ut ipsum congue, scelerisque lectus nec,
                    iaculis metus. Integer hendrerit dolor et libero vestibulum,
                    at blandit lacus egestas. Pellentesque habitant morbi
                    tristique senectus et netus et malesuada fames ac turpis
                    egestas.
                  </div>
                </td>
                <td className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
