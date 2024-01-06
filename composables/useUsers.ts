export function useUsers() {
  const userTableColumns = [
    {
      value: 'name',
      label: 'Name',
    },
    {
      value: 'studentCode',
      label: 'Student Code',
    },
    {
      value: 'position',
      label: 'Position',
    },
    {
      value: 'generation',
      label: 'Generation',
    },
    {
      value: 'action',
      label: 'Action',
    },
  ]

  return { userTableColumns }
}
