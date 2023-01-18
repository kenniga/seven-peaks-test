import classNames from 'classnames';
import styles from './styles.module.scss';

interface Options {
    label: string;
    value: string | number;
}

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Options[];
}

export default function Select({ options, className, ...resProps }: Props) {
    const selectClassnames = classNames(styles.select, className);

    function renderOption(option: Options): JSX.Element {
        return (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
        );
    }

    return (
        <div className={selectClassnames}>
            <select {...resProps}>{options.map(renderOption)}</select>
        </div>
    );
}
