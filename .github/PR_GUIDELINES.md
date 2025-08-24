# Pull Request Guidelines

This document provides guidelines for creating pull requests in the Event Calendar App repository.

## Templates Available

### 1. Standard Pull Request Template
**File:** `.github/pull_request_template.md`
**Usage:** Automatically applied to all pull requests
**Best for:** Feature branches, bug fixes, and general development work

### 2. Dev to Main Merge Template  
**File:** `.github/dev_to_main_template.md`
**Usage:** Copy content when merging develop branch to main
**Best for:** Release merges, major feature deployments

## When to Use Each Template

### Standard Template
Use for:
- Feature branch to develop merges
- Bug fix merges
- Documentation updates
- Small to medium changes
- Regular development workflow

### Dev to Main Template
Use for:
- Release deployments
- Major feature launches
- Significant infrastructure changes
- Production deployments
- Version releases

## How to Use Dev to Main Template

1. **Copy the template content** from `.github/dev_to_main_template.md`
2. **Replace placeholder text** with actual changes and details
3. **Fill out all checklists** to ensure deployment readiness
4. **Update version numbers** and release information
5. **Review all sections** for completeness before submitting

## PR Description Best Practices

### Structure
- **Clear summary** with bullet points and emojis for easy scanning
- **Detailed sections** organized by component (Frontend, Backend, CI/CD)
- **Comprehensive testing** section with checkboxes
- **Deployment considerations** and environment changes

### Emojis for Change Types
- 🚀 New features
- 🛠️ Infrastructure/tooling
- 🔑 Security
- 🐛 Bug fixes
- 📦 Performance
- 📚 Documentation
- ✨ Enhancements
- 🔧 Configuration
- 🐬 Database
- 🪓 Debugging

### Writing Tips
- Use **present tense** for descriptions
- Be **specific** about what changed and why
- Include **context** for complex changes
- Link to **related issues** and documentation
- Mention **breaking changes** prominently
- Document **testing performed**

## Required Sections

### For All PRs
- Summary of changes
- Testing performed
- Checklist completion

### For Dev to Main PRs
- Release highlights
- Technical details by component
- Environment/configuration changes
- Performance impact
- Security considerations
- Post-deployment tasks

## Review Process

### Standard PRs
- At least 1 reviewer required
- All CI checks must pass
- Manual testing recommended

### Dev to Main PRs
- Multiple reviewers recommended
- Comprehensive testing required
- Staging deployment verification
- Performance testing
- Security review

## Examples

### Good Summary Example
```markdown
### Summary
- 🚀 Added event recurring functionality with daily/weekly/monthly options
- 🛠️ Improved database query performance for event fetching
- 🐛 Fixed timezone display issue in calendar view
- 📚 Updated API documentation with new endpoints
```

### Good Details Example
```markdown
### Details
- **Frontend**
  - Added RecurringEventForm component with validation
  - Integrated with FullCalendar for recurring event display
  - Improved error handling and user feedback
- **Backend**
  - New POST /api/events/recurring endpoint
  - Added recurrence logic in event controller
  - Database indices added for performance
```

## Checklist Verification

Before submitting a dev-to-main PR, ensure:
- [ ] All template sections are filled out
- [ ] Testing checklist is complete
- [ ] Environment variables are documented
- [ ] Breaking changes are clearly marked
- [ ] Performance impact is assessed
- [ ] Security implications are considered
- [ ] Post-deployment tasks are defined

## Additional Resources

- [Contributing Guidelines](../CONTRIBUTING.md) (if exists)
- [Development Workflow](../docs/development.md) (if exists)
- [Deployment Guide](../docs/deployment.md) (if exists)