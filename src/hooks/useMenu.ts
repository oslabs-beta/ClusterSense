import { useState } from 'react';

const useMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement > (null);

    const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    return {anchorEl, handleOpen, handleClose};
 };

 export default useMenu;