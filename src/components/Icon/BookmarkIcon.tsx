interface Props {
    type: 'outline' | 'filled';
    size: number;
}

export default function BookmarkIcon({ type, size }: Props) {
    if (type === 'outline') {
        return (
            <svg viewBox="0 0 12 14" width={size} fill="currentColor">
                <defs>
                    <path
                        d="M12.75,2.25 L5.25,2.25 C4.425,2.25 3.75,2.925 3.75,3.75 L3.75,15.75 L9,13.5 L14.25,15.75 L14.25,3.75 C14.25,2.925 13.575,2.25 12.75,2.25 Z M12.75,13.5 L9,11.865 L5.25,13.5 L5.25,4.5 C5.25,4.0875 5.5875,3.75 6,3.75 L12,3.75 C12.4125,3.75 12.75,4.0875 12.75,4.5 L12.75,13.5 Z"
                        id="path-1"
                    ></path>
                </defs>
                <g id="Test-screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="toast:-removed-bookmark" transform="translate(-446.000000, -9.000000)">
                        <g id="Group-8-Copy">
                            <g id="Group-7" transform="translate(443.000000, 4.000000)">
                                <g id="action-/-bookmark_border_24px" transform="translate(0.000000, 3.000000)">
                                    <mask id="mask-2" fill="white">
                                        <use xlinkHref="#path-1"></use>
                                    </mask>
                                    <use fill="currentColor" fillRule="evenodd" xlinkHref="#path-1"></use>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
    return (
        <svg width={size} viewBox="0 0 12 14" fill="currentColor">
            <defs>
                <path
                    d="M12.75,2.25 L5.25,2.25 C4.425,2.25 3.75,2.925 3.75,3.75 L3.75,15.75 L9,13.5 L14.25,15.75 L14.25,3.75 C14.25,2.925 13.575,2.25 12.75,2.25 Z"
                    id="path-1"
                ></path>
            </defs>
            <g id="Test-screens" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g id="toast:-added-bookmark" transform="translate(-468.000000, -9.000000)">
                    <g id="Group-8">
                        <g id="Group-7" transform="translate(465.000000, 4.000000)">
                            <g id="action-/-bookmark_24px" transform="translate(0.000000, 3.000000)">
                                <mask id="mask-2" fill="white">
                                    <use xlinkHref="#path-1"></use>
                                </mask>
                                <use fill="currentColor" fillRule="evenodd" xlinkHref="#path-1"></use>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    );
}
