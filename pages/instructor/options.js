

// Commands
export const commands = {
  'DELETE_BLOG': 'DELETE_BLOG',
  'EDIT_BLOG': 'EDIT_BLOG',
}

const createOption = (name, command) => ({name, command})

// Options
// Published Blogs
const DELETE_BLOG = createOption('Delete Blog', commands.DELETE_BLOG)
const EDIT_BLOG = createOption('Edit Blog', commands.EDIT_BLOG)

// Options
// Drafts Blogs
const DELETE_DRAFT = createOption('Delete Draft', commands.DELETE_BLOG)
const EDIT_DRAFT = createOption('Edit Draft', commands.EDIT_BLOG)


export const createPublishedOptions = () => [EDIT_BLOG, DELETE_BLOG]
export const createDraftsOptions = () => [EDIT_DRAFT, DELETE_DRAFT]

