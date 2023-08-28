"use client";
import { SSX } from "@spruceid/ssx";
import { useState } from "react";
import KeplerStorageComponent from "./KeplerStorageComponent";
import RebaseCredentialComponent from "./RebaseCredentialComponent";
import UserProfile from './UserProfile'
import Home from './Home'
import SocialComponent from './SocialComponent'
import '../app/userProfile.css'

const SSXComponent = () => {

  const [ssxProvider, setSSX] = useState<SSX | null>(null);
  const [ensProvider, setENS] = useState<any>(null);
  // let KRBoolean = false;

  const ssxHandler = async () => {
    const ssx = new SSX({
      providers: {
        server: {
          host: "http://localhost:3000/api"
        }
      },
      modules: {
        storage: {
          prefix: 'my-app',
          hosts: ['https://kepler.spruceid.xyz'],
          autoCreateNewOrbit: true
        }
      },
    });
    await ssx.signIn();
    setSSX(ssx);
    const ensData = await ssx.resolveEns(`${ssx.userAuthorization.session!.address}`, {
        domain: true,
        avatar: true,
    });
    setENS(ensData);
  };

  const ssxLogoutHandler = async () => {
    ssxProvider?.signOut();
    setSSX(null);
    setENS(null);
  };

  const address = ssxProvider?.address() || '';

  // let count = 0
  // const KRClick = () => {
  //   if (count % 2 == 1) {
  //     KRBoolean = true;
  //   } else {
  //     KRBoolean = false
  //   }
  // }

  return (
    <div className="App-body">
      <Home/>
      {
        ssxProvider ?
          <div className="userProfile">
            <UserProfile ssx={ssxProvider} ens={ensProvider} />
            {
              address &&
              <p>
                <b>Ethereum Address:</b> <code>{address}</code>
              </p>
            }
            <SocialComponent />
            <button className="button-3" role="button" onClick={ssxLogoutHandler}>
              <span>
                Sign-Out
              </span>
            </button>

            {/* <button onClick={KRClick}>Show Keplr & Rebase</button>
            <KeplerStorageComponent ssx={ssxProvider} />
            <RebaseCredentialComponent ssx={ssxProvider} /> */}

          </div> :
          <div className="userProfile">
            <h1>Welcome</h1>
            <button className="button-3" role="button" onClick={ssxHandler}>
              <span>
                Sign-In with Ethereum
              </span>
            </button>
          </div>
      }
    </div>
  );
};

export default SSXComponent;