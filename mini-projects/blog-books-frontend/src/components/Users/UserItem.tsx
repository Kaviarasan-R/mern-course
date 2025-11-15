import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAllUsers } from "../../slice/UsersSlice";
import UserGeoLocation from "./UserGeoLocation";

const UserItem = () => {
  const { userId } = useParams();

  const userDetails = useSelector(selectAllUsers).find(
    (user) => user.id.toString() === userId
  );
  console.log("userDetails", userDetails);

  if (!userDetails) {
    return (
      <div className="min-h-screen">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100">
              User details not found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              We couldn't find a user with this ID. Try returning to the users
              list.
            </p>
            <div className="mt-6">
              <Link
                to="/home/users"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-white shadow hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                <span aria-hidden>←</span>
                Back to Users
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  let fullAddress = "";
  if (
    userDetails.address &&
    typeof userDetails.address === "object" &&
    "suite" in userDetails.address
  ) {
    fullAddress = [
      userDetails.address.suite,
      userDetails.address.street,
      userDetails.address.city,
      userDetails.address.zipcode,
    ]
      .filter(Boolean)
      .join(", ");
  } else if (typeof userDetails.address === "string") {
    fullAddress = userDetails.address;
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-100">
              {userDetails.name}
            </h1>
          </div>
          <div className="m-1">
            <Link
              to="/home/users"
              className="inline-flex items-center gap-2 rounded-xl  p-1 border text-white bg-gray-950"
            >
              <span aria-hidden>←</span>
              Back to Users
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* Details Card */}
          <section className="lg:col-span-2 rounded-2xl border bg-gray-900 p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Contact Details
            </h2>
            <dl className="mt-4">
              <div className="grid grid-cols-3 gap-2 py-3">
                <dt className="col-span-1 text-sm text-gray-400 dark:text-gray-400">
                  Username
                </dt>
                <dd className="col-span-2 text-sm font-medium text-gray-100">
                  {userDetails.username || userDetails.name}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3">
                <dt className="col-span-1 text-sm text-gray-400">Email</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-100">
                  {userDetails.email}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3">
                <dt className="col-span-1 text-sm text-gray-400">Phone</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-100">
                  {userDetails.phone}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3">
                <dt className="col-span-1 text-sm text-gray-400">Website</dt>
                <dd className="col-span-2 text-sm font-medium text-indigo-600 hover:underline">
                  {userDetails.website}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3">
                <dt className="col-span-1 text-sm text-gray-400">Company</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-100">
                  {userDetails.company?.name}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3">
                <dt className="col-span-1 text-sm text-gray-400">Address</dt>
                <dd className="col-span-2 text-sm font-medium text-gray-100">
                  {fullAddress}
                </dd>
              </div>
            </dl>
          </section>

          {/* Map Card */}
          <section className="lg:col-span-3 rounded-2xl border border-gray-200/70 dark:border-gray-800/70 bg-white dark:bg-gray-900 p-4 sm:p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Location
            </h2>
            <div className="h-64 sm:h-80 rounded-xl overflow-hidden">
              <UserGeoLocation
                userLongitude={
                  typeof userDetails.address === "object" &&
                  "geo" in userDetails.address
                    ? Number(userDetails.address.geo.lng)
                    : 76.932
                }
                userLatitude={
                  typeof userDetails.address === "object" &&
                  "geo" in userDetails.address
                    ? Number(userDetails.address.geo.lat)
                    : 11.0287
                }
              />
            </div>
          </section>
        </div>

        {/* Mobile bottom spacing */}
        <div className="sm:hidden mt-8" />
      </main>
    </div>
  );
};

export default UserItem;
