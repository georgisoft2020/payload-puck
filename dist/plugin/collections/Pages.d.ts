import type { CollectionConfig } from 'payload';
import type { PuckPluginOptions } from '../../types/index.js';
/**
 * Generates a Pages collection configuration for Puck
 */
export declare function generatePagesCollection(slug: string, options: PuckPluginOptions): CollectionConfig;
export { puckDataField } from '../fields/index.js';
