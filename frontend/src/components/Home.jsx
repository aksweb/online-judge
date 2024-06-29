import React from "react";

const Home = () => {
  return (
    <div className="flex flex-wrap lg:flex-nowrap">
      {/* Recent Contest History */}
      <div className="w-full lg:w-2/5 px-2 py-4 lg:px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h3 className="text-lg font-semibold text-white">Contest</h3>
          </div>
          <div className="p-4">
            <div id="contest-table-permanent">
              <h4 className="text-md font-semibold mb-2">Permanent Contests</h4>
              <div className="overflow-auto">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left">Contest Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">
                        <a
                          href="/contests/practice"
                          className="text-blue-500 hover:underline"
                        >
                          practice contest
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <a
                          href="/contests/practice2"
                          className="text-blue-500 hover:underline"
                        >
                          AtCoder Library Practice Contest
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <hr className="my-4" />
            <div id="contest-table-upcoming">
              <h4 className="text-md font-semibold mb-2">Upcoming Contests</h4>
              <div className="overflow-auto">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left" width="36%">
                        Start Time
                      </th>
                      <th className="text-left">Contest Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">
                        <a
                          href="http://www.timeanddate.com/worldclock/fixedtime.html?iso=20240629T2100&amp;p1=248"
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          6/29(Sat) 17:30
                        </a>
                      </td>
                      <td className="py-1">
                        <a
                          href="/contests/arc180"
                          className="text-blue-500 hover:underline"
                        >
                          AtCoder Regular Contest 180
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <a
                          href="http://www.timeanddate.com/worldclock/fixedtime.html?iso=20240630T2100&amp;p1=248"
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          6/30(Sun) 17:30
                        </a>
                      </td>
                      <td className="py-1">
                        <a
                          href="/contests/abc360"
                          className="text-blue-500 hover:underline"
                        >
                          AtCoder Beginner Contest 360
                        </a>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
            <hr className="my-4" />
            <div id="contest-table-recent">
              <h4 className="text-md font-semibold mb-2">Recent Contests</h4>
              <div className="overflow-auto">
                <table className="table-auto w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left" width="36%">
                        Start Time
                      </th>
                      <th className="text-left">Contest Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-1">
                        <a
                          href="http://www.timeanddate.com/worldclock/fixedtime.html?iso=20240622T2100&amp;p1=248"
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          6/22(Sat) 17:30
                        </a>
                      </td>
                      <td className="py-1">
                        <a
                          href="/contests/abc359"
                          className="text-blue-500 hover:underline"
                        >
                          UNIQUE VISION Programming Contest 2024 Summer
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1">
                        <a
                          href="http://www.timeanddate.com/worldclock/fixedtime.html?iso=20240616T1500&amp;p1=248"
                          target="_blank"
                          className="text-blue-500 hover:underline"
                        >
                          6/16(Sun) 11:30
                        </a>
                      </td>
                      <td className="py-1">
                        <a
                          href="/contests/ahc034"
                          className="text-blue-500 hover:underline"
                        >
                          Toyota Programming Contest 2024#6
                        </a>
                      </td>
                    </tr>
                    {/* Add more rows as needed */}
                  </tbody>
                </table>
              </div>
            </div>
            <br />
            <p className="text-center">
              <a href="/contests/" className="text-blue-500 hover:underline">
                Detail
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Recently Posted Contests */}
      <div className="w-full lg:w-3/5 px-2 py-4 lg:px-4">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-primary p-4">
            <h3 className="text-lg font-semibold text-white">
              Recently Posted Contests
            </h3>
          </div>
          <div className="p-4">
            {/* Add details for recently posted contests here */}
            <div>
              <h4 className="text-md font-semibold mb-2">Recent Contests</h4>
              <ul>
                <li className="py-2 border-b border-gray-200">
                  <a
                    href="/contests/new1"
                    className="text-blue-500 hover:underline"
                  >
                    New Contest 1
                  </a>
                  <p className="text-sm text-gray-600">Posted on: 2024-06-28</p>
                </li>
                <li className="py-2 border-b border-gray-200">
                  <a
                    href="/contests/new2"
                    className="text-blue-500 hover:underline"
                  >
                    New Contest 2
                  </a>
                  <p className="text-sm text-gray-600">Posted on: 2024-06-27</p>
                </li>
                {/* Add more recently posted contests as needed */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
