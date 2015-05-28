json.array!(@questions) do |question|
  json.extract! question, :id, :author, :text, :created_at, :updated_at
end
