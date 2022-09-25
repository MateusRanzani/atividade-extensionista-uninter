import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const NavBar: NextPage = (props) => {
  return (
    <nav>
      <div className="navBar flex justify-between items-center border-b-[1px] border-[#e6e5e5]">
        <div className="flex items-center">
          <div className="mr-10">
            <Link href="/">
              <div className="icon--logo">
                <Image
                  loader={myLoader}
                  src="me.png"
                  alt="Picture of the author"
                  width={60}
                  height={45}
                />
              </div>
            </Link>
          </div>

          <div className="mr-10">
            <Link href="/search">
              <a className="--button">EVENTOS</a>
            </Link>
          </div>
          <div className="mr-10">
            <Link href="/news">
              <a className="--button">NOTÍCIAS</a>
            </Link>
          </div>
        </div>
        <div></div>
        <div>
          <Link href="/profile">
            <a className="login--button">LOGIN</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const myLoader = ({ src, width, quality }: any) => {
  return "/assets/logoGreen.png";
};

export default NavBar;
