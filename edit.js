/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	InspectorControls,
	BlockControls,
	ColorPalette,
	PanelColorSettings
} from '@wordpress/block-editor';

/**
 * WordPress components for the sidebar controls.
 */
import {
	PanelBody,
	TextareaControl,
	RangeControl,
	ToggleControl,
	BaseControl,
	ToolbarGroup,
	ToolbarButton,
	SelectControl,
	ExternalLink
} from '@wordpress/components';

/**
 * WordPress icons
 */
import { formatUppercase, formatBold } from '@wordpress/icons';

/**
 * React hooks
 */
import { useState, useEffect, useMemo } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object} props - Block properties.
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
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

	const [isAnimating, setIsAnimating] = useState(true);

	const blockProps = useBlockProps({
		style: {
			backgroundColor: hasBackground ? backgroundColor : 'transparent',
			color: textColor,
			fontSize: `${fontSize}px`,
			textTransform,
			fontWeight,
		},
		className: 'wp-block-telex-ticker-tape-parade',
		'data-speed': speed
	});

	// Calculate animation duration based on speed (lower speed = longer duration)
	// Using the same formula as the frontend for consistency
	const animationDuration = useMemo(() => {
		return `${Math.max(10, 60 - speed)}s`;
	}, [speed]);

	const tickerStyle = {
		animationDuration: animationDuration,
		animationPlayState: isAnimating ? 'running' : 'paused',
	};

	useEffect(() => {
		setIsAnimating(true);
	}, [content, speed]);

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						isPressed={textTransform === 'uppercase'}
						onClick={() => setAttributes({ 
							textTransform: textTransform === 'uppercase' ? 'none' : 'uppercase' 
						})}
						icon={formatUppercase}
						label={__('Uppercase', 'ticker-tape-parade-block-wp')}
					/>
					<ToolbarButton
						isPressed={fontWeight === 'bold'}
						onClick={() => setAttributes({ 
							fontWeight: fontWeight === 'bold' ? 'normal' : 'bold' 
						})}
						icon={formatBold}
						label={__('Bold', 'ticker-tape-parade-block-wp')}
					/>
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={__('Content Settings', 'ticker-tape-parade-block-wp')}>
					<TextareaControl
						label={__('Ticker Text', 'ticker-tape-parade-block-wp')}
						value={content}
						onChange={(value) => setAttributes({ content: value })}
						placeholder={__('Enter ticker text. Use bullet points (•) or line breaks to separate items.', 'ticker-tape-parade-block-wp')}
						rows={4}
						help={__('Separate multiple items with bullet points (•) or line breaks for continuous scrolling.', 'ticker-tape-parade-block-wp')}
					/>
				</PanelBody>

				<PanelBody title={__('Text Formatting', 'ticker-tape-parade-block-wp')}>
					<SelectControl
						label={__('Text Transform', 'ticker-tape-parade-block-wp')}
						value={textTransform}
						options={[
							{ label: __('None', 'ticker-tape-parade-block-wp'), value: 'none' },
							{ label: __('Uppercase', 'ticker-tape-parade-block-wp'), value: 'uppercase' },
							{ label: __('Lowercase', 'ticker-tape-parade-block-wp'), value: 'lowercase' },
							{ label: __('Capitalize', 'ticker-tape-parade-block-wp'), value: 'capitalize' },
						]}
						onChange={(value) => setAttributes({ textTransform: value })}
					/>
					
					<SelectControl
						label={__('Font Weight', 'ticker-tape-parade-block-wp')}
						value={fontWeight}
						options={[
							{ label: __('Normal', 'ticker-tape-parade-block-wp'), value: 'normal' },
							{ label: __('Bold', 'ticker-tape-parade-block-wp'), value: 'bold' },
							{ label: __('Light', 'ticker-tape-parade-block-wp'), value: '300' },
							{ label: __('Semi Bold', 'ticker-tape-parade-block-wp'), value: '600' },
						]}
						onChange={(value) => setAttributes({ fontWeight: value })}
					/>

					<RangeControl
						label={__('Font Size', 'ticker-tape-parade-block-wp')}
						value={fontSize}
						onChange={(value) => setAttributes({ fontSize: value })}
						min={12}
						max={36}
						step={1}
					/>
				</PanelBody>

				<PanelBody title={__('Animation Settings', 'ticker-tape-parade-block-wp')}>
					<RangeControl
						label={__('Scroll Speed', 'ticker-tape-parade-block-wp')}
						value={speed}
						onChange={(value) => setAttributes({ speed: value })}
						min={5}
						max={50}
						step={1}
						help={__(`Higher values = faster scrolling (Current: ${animationDuration} per cycle)`, 'ticker-tape-parade-block-wp')}
					/>
					<ToggleControl
						label={__('Pause on Hover', 'ticker-tape-parade-block-wp')}
						checked={pauseOnHover}
						onChange={(value) => setAttributes({ pauseOnHover: value })}
						help={__('Allow users to pause the ticker by hovering over it', 'ticker-tape-parade-block-wp')}
					/>
				</PanelBody>

				<PanelColorSettings
					title={__('Color Settings', 'ticker-tape-parade-block-wp')}
					colorSettings={[
						{
							value: textColor,
							onChange: (color) => setAttributes({ textColor: color }),
							label: __('Text Color', 'ticker-tape-parade-block-wp'),
						},
						...(hasBackground ? [{
							value: backgroundColor,
							onChange: (color) => setAttributes({ backgroundColor: color }),
							label: __('Background Color', 'ticker-tape-parade-block-wp'),
						}] : [])
					]}
				>
					<ToggleControl
						label={__('Use Background Color', 'ticker-tape-parade-block-wp')}
						checked={hasBackground}
						onChange={(value) => setAttributes({ hasBackground: value })}
						help={__('Toggle to add or remove background color', 'ticker-tape-parade-block-wp')}
					/>
				</PanelColorSettings>

				<PanelBody title={__('Powered by Telex', 'ticker-tape-parade-block-wp')} initialOpen={false}>
					<p style={{ marginBottom: '12px', color: '#666' }}>
						{__('Telex is basically the J.A.R.V.I.S of WordPress development - an AI that builds blocks so you don\'t have to.', 'ticker-tape-parade-block-wp')}
					</p>
					<ExternalLink href="https://telex.automattic.ai">
						{__('Learn more about Telex', 'ticker-tape-parade-block-wp')}
					</ExternalLink>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="ticker-container">
					<div 
						className="ticker-content"
						style={tickerStyle}
						onMouseEnter={() => pauseOnHover && setIsAnimating(false)}
						onMouseLeave={() => pauseOnHover && setIsAnimating(true)}
					>
						<span className="ticker-text">
							{content || __('Enter your ticker text...', 'ticker-tape-parade-block-wp')}
						</span>
					</div>
				</div>
				<div className="ticker-preview-note">
					{__(`Preview: Scrolls ${animationDuration} per cycle (Speed: ${speed})`, 'ticker-tape-parade-block-wp')}
				</div>
			</div>
		</>
	);
}