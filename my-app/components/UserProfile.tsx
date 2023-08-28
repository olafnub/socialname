import { SSX } from '@spruceid/ssx';
import { useEffect, useState } from 'react';

interface User {
    ssx: SSX,
    ens: any
  }

const UserProfile = ({ ssx, ens }: User) => {
    const address: any = ssx.userAuthorization.session?.address;
    const [avatarUrl, setAvatarUrl] = useState<string|null>(null);
    const [domain, setDomain] = useState<string|null>(null);

    // const ensName: any = useEnsName({ address, chainId: 1 })
    // const ensAvatar: any = useEnsAvatar({ name: ensName.data, chainId: 1 })
    // console.log(ensName)
    
    const returnEns = async () => {
        console.log(ens)
        const addAvatar = await ens.avatarUrl
        const addDomain = await ens.domain
        setAvatarUrl(addAvatar)
        setDomain(addDomain)
    }

    useEffect(() => {
        returnEns();
    }, []);

    return (
        <div>
            <h1>Welcome!</h1>
            <img
                src={avatarUrl || 'https://i.imgur.com/UhV7H97.jpeg'}
                style={{ width: '2rem', height: '2rem', objectFit: 'cover' }}
            />
            <span>
                {domain || 'No name set'}
            </span>
        </div>
    )
}

export default UserProfile;