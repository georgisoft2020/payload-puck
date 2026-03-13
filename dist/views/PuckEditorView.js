/**
 * PuckEditorView - React Server Component for Payload Admin
 *
 * This is the admin view that wraps the Puck editor within Payload's admin layout.
 * It fetches page data server-side and passes it to the client component.
 *
 * Registered as a custom view via config.admin.components.views
 */ import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DefaultTemplate } from '@payloadcms/next/templates';
import { getVisibleEntities } from '@payloadcms/ui/shared';
import { PuckEditor } from '../editor/PuckEditor.js';
import { mapPayloadFieldsToRootProps } from '../api/utils/mapRootProps.js';
/**
 * Server Component that renders the Puck editor within Payload admin
 *
 * URL pattern: /admin/puck-editor/:collection/:id
 */ export async function PuckEditorView({ initPageResult, params, searchParams }) {
    const { req } = initPageResult;
    const { payload } = req;
    // Get admin route from config
    const adminRoute = req.payload.config.routes?.admin || '/admin';
    // Parse segments from URL: /admin/puck-editor/:collection/:id
    // params.segments contains the full path after /admin/, e.g. ['puck-editor', 'pages', '1']
    // We need to skip the route prefix ('puck-editor') to get collection and id
    const segments = (await params)?.segments;
    // segments[0] = 'puck-editor' (route prefix), segments[1] = collection, segments[2] = id
    const collection = segments?.[1] || 'pages';
    const pageId = segments?.[2];
    if (!pageId) {
        return /*#__PURE__*/ _jsx(DefaultTemplate, {
            i18n: req.i18n,
            locale: req.locale,
            params: params,
            payload: payload,
            permissions: initPageResult.permissions,
            searchParams: searchParams,
            user: req.user ?? undefined,
            visibleEntities: getVisibleEntities({
                req
            }),
            children: /*#__PURE__*/ _jsx("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '50vh',
                    color: 'var(--theme-elevation-500)'
                },
                children: /*#__PURE__*/ _jsx("p", {
                    children: "No page ID provided. Please navigate from the collection view."
                })
            })
        });
    }
    // Get visible entities for the sidebar navigation
    const visibleEntities = getVisibleEntities({
        req
    });
    // Get puck config from plugin custom settings
    const puckConfig = payload.config.custom?.puck?.config;
    const layouts = payload.config.custom?.puck?.layouts;
    const explicitPageTreeConfig = payload.config.custom?.puck?.pageTree;
    const aiConfig = payload.config.custom?.puck?.ai;
    const editorStylesheets = payload.config.custom?.puck?.editorStylesheets;
    const previewUrlConfig = payload.config.custom?.puck?.previewUrl;
    // Fetch the page data
    // Use depth: 1 if previewUrl is a function (may need relationship data like organization)
    let page = null;
    let error = null;
    const needsRelationships = typeof previewUrlConfig === 'function';
    // Read locale from searchParams (e.g. ?locale=bg)
    const resolvedSearch = await searchParams;
    const locale = resolvedSearch?.locale || req.locale;
    try {
        page = await payload.findByID({
            collection: collection,
            id: pageId,
            draft: true,
            depth: needsRelationships ? 1 : 0,
            locale
        });
    } catch (err) {
        console.error('[PuckEditorView] Error fetching page:', err);
        error = err instanceof Error ? err.message : 'Failed to load page';
    }
    // Compute preview URL prefix from config
    // Note: Functions can't be passed to client components, so we extract a string prefix here.
    // The client reconstructs the URL function as: (slug) => slug ? `${prefix}/${slug}` : prefix
    //
    // IMPORTANT: When the config returns a function, we call it with '' to get the prefix.
    // This relies on the function using the pattern: (slug) => slug ? `/${org}/${slug}` : `/${org}`
    // See PuckPluginOptions.previewUrl JSDoc in src/types/index.ts for details.
    let previewUrlPrefix;
    if (previewUrlConfig && page) {
        if (typeof previewUrlConfig === 'function') {
            const result = previewUrlConfig(page);
            if (typeof result === 'string') {
                // Function returned a string prefix directly (e.g., '/acme')
                previewUrlPrefix = result;
            } else if (typeof result === 'function') {
                // Function returned a slug-to-URL function - call with '' to extract prefix
                // e.g., (slug) => slug ? `/acme/${slug}` : `/acme` called with '' returns '/acme'
                previewUrlPrefix = result('');
            }
        } else {
            previewUrlPrefix = previewUrlConfig;
        }
    }
    // Fetch AI prompts from collection if enabled
    let aiExamplePrompts = aiConfig?.examplePrompts || [];
    if (aiConfig?.enabled && aiConfig?.promptsCollection) {
        try {
            const promptsResult = await payload.find({
                collection: 'puck-ai-prompts',
                sort: 'order',
                limit: 50
            });
            // Merge collection prompts with config prompts (collection prompts first)
            const collectionPrompts = promptsResult.docs.map((doc)=>({
                    label: doc.label,
                    prompt: doc.prompt
                }));
            aiExamplePrompts = [
                ...collectionPrompts,
                ...aiExamplePrompts
            ];
        } catch (e) {
            // Collection might not exist yet, that's ok
            console.warn('[PuckEditorView] Could not fetch AI prompts:', e);
        }
    }
    // Determine page-tree config:
    // 1. If explicitly set to false in plugin options, disable
    // 2. If explicit config provided, use it
    // 3. Otherwise, auto-detect by checking for pageSegment field (added by page-tree plugin)
    let pageTreeConfig = null;
    if (explicitPageTreeConfig === false) {
        // Explicitly disabled
        pageTreeConfig = null;
    } else if (explicitPageTreeConfig) {
        // Use explicit config
        pageTreeConfig = explicitPageTreeConfig;
    } else {
        // Auto-detect: check if collection has pageSegment field
        const collectionConfig = payload.collections[collection]?.config;
        const hasPageTreeFields = collectionConfig?.fields?.some((field)=>field.name === 'pageSegment');
        if (hasPageTreeFields) {
            pageTreeConfig = {
                folderSlug: 'payload-folders',
                pageSegmentFieldName: 'pageSegment',
                folderFieldName: 'folder'
            };
        }
    }
    // Build back URL to collection
    const backUrl = `${adminRoute}/collections/${collection}/${pageId}`;
    // Build initial data, syncing Payload fields to root.props
    let initialData = page?.puckData || {
        content: [],
        root: {
            props: {}
        }
    };
    if (page) {
        // Map Payload document fields to root.props format
        // This ensures fields like title, slug, isHomepage, pageLayout are synced
        const syncedRootProps = mapPayloadFieldsToRootProps(page);
        // Handle folder ID specially (could be object or string)
        if (pageTreeConfig && page.folder !== undefined) {
            const folderId = typeof page.folder === 'object' ? page.folder?.id : page.folder;
            syncedRootProps.folder = folderId || null;
        }
        initialData = {
            ...initialData,
            root: {
                ...initialData.root,
                props: {
                    ...initialData.root?.props,
                    ...syncedRootProps
                }
            }
        };
    }
    return /*#__PURE__*/ _jsx(DefaultTemplate, {
        i18n: req.i18n,
        locale: req.locale,
        params: params,
        payload: payload,
        permissions: initPageResult.permissions,
        searchParams: searchParams,
        user: req.user ?? undefined,
        visibleEntities: visibleEntities,
        children: error ? /*#__PURE__*/ _jsx("div", {
            style: {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '50vh',
                color: 'var(--theme-error-500)'
            },
            children: /*#__PURE__*/ _jsxs("p", {
                children: [
                    "Error: ",
                    error
                ]
            })
        }) : /*#__PURE__*/ _jsx("div", {
            style: {
                // Take up full available height within the admin template
                height: 'calc(100vh - 60px)',
                display: 'flex',
                flexDirection: 'column'
            },
            children: /*#__PURE__*/ _jsx(PuckEditor, {
                pageId: pageId,
                initialData: initialData,
                pageTitle: page?.title || 'Untitled',
                pageSlug: page?.slug || '',
                apiEndpoint: `/api/puck/${collection}`,
                initialStatus: page?._status,
                backUrl: backUrl,
                previewUrlPrefix: previewUrlPrefix,
                layouts: layouts,
                hasPageTree: !!pageTreeConfig,
                folder: pageTreeConfig ? typeof page?.folder === 'object' ? page?.folder?.id : page?.folder : undefined,
                pageSegment: pageTreeConfig ? page?.pageSegment : undefined,
                enableAi: aiConfig?.enabled,
                aiExamplePrompts: aiExamplePrompts,
                hasPromptsCollection: !!aiConfig?.promptsCollection,
                hasContextCollection: !!aiConfig?.contextCollection,
                aiComponentInstructions: aiConfig?.componentInstructions,
                editorStylesheets: editorStylesheets
            })
        })
    });
}
export default PuckEditorView;
