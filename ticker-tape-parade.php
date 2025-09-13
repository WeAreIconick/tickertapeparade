<?php
/**
 * Plugin Name:       Ticker Tape Parade
 * Description:       A customizable horizontal scrolling text ticker block for displaying announcements, news, or any scrolling text content.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            WordPress Telex
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       ticker-tape-parade-block-wp
 *
 * @package TickerTapeParade
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function telex_ticker_tape_parade_block_init() {
	register_block_type( __DIR__ . '/build/' );
}
add_action( 'init', 'telex_ticker_tape_parade_block_init' );
	