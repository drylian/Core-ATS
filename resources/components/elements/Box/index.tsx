import { BoxListBoolean, BoxListBooleanProps } from './BoxListBoolean';
import { BoxSubtitle, BoxSubtitleProps } from './BoxSubtitle';
import { BoxInfo, BoxInfoProps } from './BoxInfo';
import { BoxRoot, BoxRootProps } from './BoxRoot';

interface Boxes {
    base: React.ComponentType<BoxRootProps>;
    boolean: React.ComponentType<BoxListBooleanProps>;
    subtitle: React.ComponentType<BoxSubtitleProps>;
    info: React.ComponentType<BoxInfoProps>;
}

const Box: Boxes = {
    base: BoxRoot,
    boolean: BoxListBoolean,
    subtitle: BoxSubtitle,
    info: BoxInfo
};

export default Box;
