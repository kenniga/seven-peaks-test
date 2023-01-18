import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import styles from './styles.module.scss';

interface Props {
    type: 'audio' | 'video' | 'image';
    source: string;
    mediaData: any;
}

export default function MediaRenderer({ type, source, mediaData }: Props) {
    switch (type) {
        case 'audio':
            return <AudioPlayer autoPlay src={source} />;
        case 'video': {
            if (mediaData.videoTypeData.html) {
                return <div dangerouslySetInnerHTML={{ __html: mediaData.videoTypeData.html }} />;
            } else {
                return <video src={source} controls />;
            }
        }
        case 'image': {
            const alt = mediaData.imageTypeData.alt;
            const caption = mediaData.imageTypeData.caption;
            return (
                <figure>
                    <img className={styles.img} src={source} alt={alt} />
                    <figcaption className={styles.caption}>{caption}</figcaption>
                </figure>
            );
        }
        default:
            return <div>Invalid Media Type</div>;
    }
}
