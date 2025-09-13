/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props - Block properties.
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	const { 
		content, 
		speed, 
		textColor, 
		backgroundColor, 
		fontSize,
		pauseOnHover,
		textTransform,
		fontWeight,
		hasBackground
	} = attributes;

	const blockProps = useBlockProps.save({
		style: {
			backgroundColor: hasBackground ? backgroundColor : 'transparent',
			color: textColor,
			fontSize: `${fontSize}px`,
			textTransform,
			fontWeight,
		},
		className: `wp-block-telex-ticker-tape-parade ${pauseOnHover ? 'pause-on-hover' : ''} ${hasBackground ? 'has-background' : 'no-background'}`,
		'data-speed': speed,
	});

	return (
		<div {...blockProps}>
			<div className="ticker-container">
				<div className="ticker-content">
					<span className="ticker-text">
						{content}
					</span>
				</div>
			</div>
		</div>
	);
}