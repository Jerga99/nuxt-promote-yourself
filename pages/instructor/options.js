

// Commands
export const commands = {
  'DELETE_BLOG': 'DELETE_BLOG',
  'EDIT_BLOG': 'EDIT_BLOG',
  'TOGGLE_FEATURE': 'TOGGLE_FEATURE'
}

const createOption = (name, command) => ({name, command})

// Options
// Published Blogs
const DELETE_BLOG = createOption('Delete Blog', commands.DELETE_BLOG)
const EDIT_BLOG = createOption('Edit Blog', commands.EDIT_BLOG)
const FEATURE_BLOG = createOption('Feature Blog', commands.TOGGLE_FEATURE)
const UN_FEATURE_BLOG = createOption('Un-Feature Blog', commands.TOGGLE_FEATURE)

// Options
// Drafts Blogs
const DELETE_DRAFT = createOption('Delete Draft', commands.DELETE_BLOG)
const EDIT_DRAFT = createOption('Edit Draft', commands.EDIT_BLOG)


export const createPublishedOptions = (isFeatured) => {
  const options = [EDIT_BLOG, DELETE_BLOG]

  isFeatured ? options.push(UN_FEATURE_BLOG) : options.push(FEATURE_BLOG)

  return options
}

export const createDraftsOptions = () => [EDIT_DRAFT, DELETE_DRAFT]

